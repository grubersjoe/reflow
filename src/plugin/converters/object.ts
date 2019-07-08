import {
  Identifier,
  ObjectTypeAnnotation,
  ObjectTypeProperty,
  ObjectTypeSpreadProperty,
  StringLiteral,
  TSMethodSignature,
  TSPropertySignature,
  TSTypeElement,
  TSTypeLiteral,
  identifier,
  isFunctionTypeAnnotation,
  isIdentifier,
  isNumberTypeAnnotation,
  isObjectTypeProperty,
  isObjectTypeSpreadProperty,
  isStringLiteral,
  isStringTypeAnnotation,
  isTSPropertySignature,
  isTSTypeLiteral,
  tsCallSignatureDeclaration,
  tsIndexSignature,
  tsMethodSignature,
  tsNumberKeyword,
  tsPropertySignature,
  tsStringKeyword,
  tsTypeAnnotation,
  tsTypeLiteral,
  tsUnionType,
} from '@babel/types';
import { convertFlowType } from './flow-type';

import { UnexpectedError } from '../../util/error';
import { ConverterState } from '../types';
import { WARNINGS, logWarning } from '../util/warnings';
import { functionTypeParametersToIdentifiers, convertFunctionTypeAnnotation } from './function';
import { convertTypeParameterDeclaration } from './type-parameter';

type SignatureKey = Identifier | StringLiteral;

function signatureKeysAreEqual(signature: TSTypeElement, key: SignatureKey): boolean {
  if (isTSPropertySignature(signature)) {
    if (isIdentifier(signature.key) && isIdentifier(key)) {
      return signature.key.name === key.name;
    }

    if (isIdentifier(signature.key) && isStringLiteral(key)) {
      return signature.key.name === key.value;
    }

    if (isStringLiteral(signature.key) && isIdentifier(key)) {
      return signature.key.value === key.name;
    }

    if (isStringLiteral(signature.key) && isStringLiteral(key)) {
      return signature.key.value === key.value;
    }
  }

  throw new UnexpectedError('Unknown signature type');
}

function replaceProperty(
  signatures: TSTypeElement[],
  key: SignatureKey,
  updatedProp: TSPropertySignature,
): TSTypeElement[] {
  return signatures.map(prop => (signatureKeysAreEqual(prop, key) ? updatedProp : prop));
}

function createMethodSignature(prop: ObjectTypeProperty, state: ConverterState): TSMethodSignature {
  const { key, optional, value } = prop;

  if (!isFunctionTypeAnnotation(value)) {
    throw new UnexpectedError(`prop.value must be a FunctionTypeAnnotation.`);
  }

  const functionType = convertFunctionTypeAnnotation(value, state);
  const methodSignature = tsMethodSignature(
    key,
    functionType.typeParameters,
    functionType.parameters,
    functionType.typeAnnotation,
  );

  methodSignature.optional = optional;

  return methodSignature;
}

function createPropertySignature(
  prop: ObjectTypeProperty,
  node: ObjectTypeAnnotation,
  state: ConverterState,
): TSPropertySignature {
  const { key, optional, variance } = prop;
  const propSignature = tsPropertySignature(
    key,
    tsTypeAnnotation(convertFlowType(prop.value, state)),
  );

  propSignature.optional = optional;
  propSignature.readonly = variance && variance.kind === 'plus';

  // TypeScript doesn't suppport write-only properties. So Flow's
  // variance.kind === 'minus' must be ignored.
  if (variance && variance.kind === 'minus') {
    logWarning(WARNINGS.objectTypeProperty.variance, state.file.code, node.loc);
  }

  return propSignature;
}

function convertObjectTypeSpreadProperty(
  node: ObjectTypeAnnotation,
  signatures: TSTypeElement[],
  prop: ObjectTypeSpreadProperty,
  state: ConverterState,
): TSTypeElement[] {
  const type = convertFlowType(prop.argument, state);

  if (isTSTypeLiteral(type)) {
    type.members.forEach(innerProp => {
      if (isTSPropertySignature(innerProp) && innerProp.typeAnnotation) {
        const { key } = innerProp;

        if (!isIdentifier(key) && !isStringLiteral(key)) {
          throw new UnexpectedError(`Unexpected property name type: ${key.type}`);
        }

        const parentProp = signatures.find(prop => signatureKeysAreEqual(prop, key));

        if (parentProp && parentProp.typeAnnotation) {
          if (node.exact) {
            // Overwrite parent property signature with the object spread one,
            // when exact object notation is used.
            signatures = replaceProperty(
              signatures,
              key,
              tsPropertySignature(key, innerProp.typeAnnotation),
            );
          } else {
            // Extend the type of the parent property signature with an union
            // of its own type and the type of the object spread property
            // otherwise.
            signatures = replaceProperty(
              signatures,
              key,
              tsPropertySignature(
                key,
                tsTypeAnnotation(
                  tsUnionType([
                    parentProp.typeAnnotation.typeAnnotation,
                    innerProp.typeAnnotation.typeAnnotation,
                  ]),
                ),
              ),
            );
          }
        } else {
          signatures.push(innerProp);
        }
      }
    });
  }

  return signatures;
}

function convertObjectTypeCallProperties(
  signatures: TSTypeElement[],
  node: ObjectTypeAnnotation,
  state: ConverterState,
): TSTypeElement[] {
  const { callProperties } = node;

  if (callProperties) {
    callProperties.forEach(callProp => {
      if (!isFunctionTypeAnnotation(callProp.value)) {
        return;
      }

      const { value } = callProp;

      const typeParameters = convertTypeParameterDeclaration(value.typeParameters, state);
      const params = functionTypeParametersToIdentifiers(value.params, state) || [];
      const typeAnnotation = tsTypeAnnotation(convertFlowType(value.returnType, state));

      signatures.push(tsCallSignatureDeclaration(typeParameters, params, typeAnnotation));
    });
  }

  return signatures;
}

function convertObjectTypeIndexers(
  signatures: TSTypeElement[],
  node: ObjectTypeAnnotation,
  state: ConverterState,
): TSTypeElement[] {
  const { indexers } = node;

  if (indexers) {
    indexers.forEach(indexer => {
      const { id, key } = indexer;
      const typeAnnotation = tsTypeAnnotation(convertFlowType(indexer.value, state));

      // TypeScript only allows number or string as key type. Add both index
      // signatures if another type is used in Flow.
      const isValidKeyType = isNumberTypeAnnotation(key) || isStringTypeAnnotation(key);

      if (isValidKeyType) {
        const tsKey = identifier(id ? id.name : 'key');
        tsKey.typeAnnotation = tsTypeAnnotation(convertFlowType(key, state));
        signatures.push(tsIndexSignature([tsKey], typeAnnotation));
      } else {
        signatures.push(
          ...[tsNumberKeyword(), tsStringKeyword()].map(type => {
            const tsKey = identifier(id ? id.name : 'key');
            tsKey.typeAnnotation = tsTypeAnnotation(type);

            return tsIndexSignature([tsKey], typeAnnotation);
          }),
        );

        logWarning(WARNINGS.indexSignatures.invalidKey, state.file.code, node.loc);
      }
    });
  }

  return signatures;
}

export function convertObjectTypeAnnotation(
  node: ObjectTypeAnnotation,
  state: ConverterState,
): TSTypeLiteral {
  const { properties } = node;

  let signatures: TSTypeElement[] = [];

  properties.forEach(prop => {
    if (isObjectTypeProperty(prop)) {
      // @ts-ignore prop.method exists
      if (isFunctionTypeAnnotation(prop.value) && prop.method) {
        signatures.push(createMethodSignature(prop, state));
      } else {
        signatures.push(createPropertySignature(prop, node, state));
      }
    }
  });

  // Handle spread properties in a second run, so that all "ordinary" props are already transformed
  // and can be accessed when merging spread properties with them.
  properties.forEach(prop => {
    if (isObjectTypeSpreadProperty(prop)) {
      signatures = convertObjectTypeSpreadProperty(node, signatures, prop, state);
    }
  });

  signatures = convertObjectTypeCallProperties(signatures, node, state);
  signatures = convertObjectTypeIndexers(signatures, node, state);

  return tsTypeLiteral(signatures);
}
