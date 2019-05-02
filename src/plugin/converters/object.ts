import {
  Identifier,
  ObjectTypeAnnotation,
  ObjectTypeCallProperty,
  ObjectTypeIndexer,
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
  isObjectTypeProperty,
  isObjectTypeSpreadProperty,
  isStringLiteral,
  isTSPropertySignature,
  isTSTypeLiteral,
  tsCallSignatureDeclaration,
  tsIndexSignature,
  tsMethodSignature,
  tsPropertySignature,
  tsTypeAnnotation,
  tsTypeLiteral,
  tsUnionType,
} from '@babel/types';
import { convertFlowType } from './flow-type';

import { UnexpectedError } from '../../util/error';
import { convertTypeParameterDeclaration } from './type-parameter';
import { functionTypeParametersToIdentifiers, convertFunctionTypeAnnotation } from './function';

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

function createMethodSignature(prop: ObjectTypeProperty): TSMethodSignature {
  const { key, optional, value } = prop;

  if (!isFunctionTypeAnnotation(value)) {
    throw new UnexpectedError(`prop.value must be a FunctionTypeAnnotation.`);
  }

  const functionType = convertFunctionTypeAnnotation(value);
  const methodSignature = tsMethodSignature(
    key,
    functionType.typeParameters,
    functionType.parameters,
    functionType.typeAnnotation,
  );

  methodSignature.optional = optional;

  return methodSignature;
}

function createPropertySignature(prop: ObjectTypeProperty): TSPropertySignature {
  const { key, optional, variance } = prop;
  const propSignature = tsPropertySignature(key, tsTypeAnnotation(convertFlowType(prop.value)));

  propSignature.optional = optional;
  propSignature.readonly = variance && variance.kind === 'plus';

  // Note: TypeScript does not suppport write-only properties. So Flow's variance.kind === 'minus'
  // has to be ignored.

  return propSignature;
}

function convertObjectTypeSpreadProperty(
  node: ObjectTypeAnnotation,
  signatures: TSTypeElement[],
  prop: ObjectTypeSpreadProperty,
): TSTypeElement[] {
  const type = convertFlowType(prop.argument);

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
            // Overwrite parent property signature with the object spread one, when exact object
            // notation is used.
            signatures = replaceProperty(
              signatures,
              key,
              tsPropertySignature(key, innerProp.typeAnnotation),
            );
          } else {
            // Extend the type of the parent property signature with an union of its own type and
            // the type of the object spread property otherwise.
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

function convertObjectTypeCallProperty(
  signatures: TSTypeElement[],
  callProp: ObjectTypeCallProperty,
): TSTypeElement[] {
  if (!isFunctionTypeAnnotation(callProp.value)) {
    return signatures;
  }

  const { value } = callProp;

  const typeParameters = convertTypeParameterDeclaration(value.typeParameters);
  const params = functionTypeParametersToIdentifiers(value.params) || [];
  const typeAnnotation = tsTypeAnnotation(convertFlowType(value.returnType));

  signatures.push(tsCallSignatureDeclaration(typeParameters, params, typeAnnotation));

  return signatures;
}

function convertObjectTypeIndexer(
  signatures: TSTypeElement[],
  indexer: ObjectTypeIndexer,
): TSTypeElement[] {
  const key = indexer.id || identifier('key');
  key.typeAnnotation = tsTypeAnnotation(convertFlowType(indexer.key));

  const typeAnnotation = tsTypeAnnotation(convertFlowType(indexer.value));
  const propIndexSignature = tsIndexSignature([key], typeAnnotation);

  signatures.push(propIndexSignature);

  return signatures;
}

export function convertObjectTypeAnnotation(node: ObjectTypeAnnotation): TSTypeLiteral {
  const { callProperties, indexers, properties } = node;
  let signatures: TSTypeElement[] = [];

  properties.forEach(prop => {
    if (isObjectTypeProperty(prop)) {
      if (isFunctionTypeAnnotation(prop.value) && prop.method) {
        signatures.push(createMethodSignature(prop));
      } else {
        signatures.push(createPropertySignature(prop));
      }
    }
  });

  // Handle spread properties in a second run, so that all "ordinary" props are already transformed
  // and can be accessed when merging spread properties with them.
  properties.forEach(prop => {
    if (isObjectTypeSpreadProperty(prop)) {
      signatures = convertObjectTypeSpreadProperty(node, signatures, prop);
    }
  });

  if (callProperties) {
    callProperties.forEach(callProp => {
      signatures = convertObjectTypeCallProperty(signatures, callProp);
    });
  }

  if (indexers) {
    indexers.forEach(indexer => {
      signatures = convertObjectTypeIndexer(signatures, indexer);
    });
  }

  return tsTypeLiteral(signatures);
}
