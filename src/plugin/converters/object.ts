import { PluginPass } from '@babel/core';
import {
  ObjectTypeAnnotation,
  ObjectTypeProperty,
  TSMethodSignature,
  TSObjectKeyword,
  TSPropertySignature,
  TSTypeElement,
  TSTypeLiteral,
  identifier,
  isFunctionTypeAnnotation,
  isNumberTypeAnnotation,
  isObjectTypeProperty,
  isObjectTypeSpreadProperty,
  isStringTypeAnnotation,
  tsCallSignatureDeclaration,
  tsIndexSignature,
  tsMethodSignature,
  tsNumberKeyword,
  tsObjectKeyword,
  tsPropertySignature,
  tsStringKeyword,
  tsTypeAnnotation,
  tsTypeLiteral,
} from '@babel/types';
import { convertFlowType } from './flow-type';

import { UnexpectedError } from '../../util/error';
import { WARNINGS, logWarning } from '../util/warnings';
import {
  functionTypeParametersToIdentifiers,
  convertFunctionTypeAnnotation,
} from './function';
import { convertTypeParameterDeclaration } from './type-parameter';

// eslint-disable-next-line @typescript-eslint/ban-types
function propIsEmpty(prop: object[] | null) {
  return prop === null || prop.length === 0;
}

function createMethodSignature(
  prop: ObjectTypeProperty,
  state: PluginPass,
): TSMethodSignature {
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
  state: PluginPass,
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
    logWarning(
      WARNINGS.objectTypeProperty.variance,
      state.file.code,
      variance.loc,
    );
  }

  return propSignature;
}

function convertObjectTypeCallProperties(
  signatures: TSTypeElement[],
  node: ObjectTypeAnnotation,
  state: PluginPass,
): TSTypeElement[] {
  const { callProperties } = node;

  if (callProperties) {
    callProperties.forEach(callProp => {
      if (!isFunctionTypeAnnotation(callProp.value)) {
        return;
      }

      const { value } = callProp;

      const typeParameters = convertTypeParameterDeclaration(
        value.typeParameters,
        state,
      );
      const params =
        functionTypeParametersToIdentifiers(value.params, state) || [];
      const typeAnnotation = tsTypeAnnotation(
        convertFlowType(value.returnType, state),
      );

      signatures.push(
        tsCallSignatureDeclaration(typeParameters, params, typeAnnotation),
      );
    });
  }

  return signatures;
}

function convertObjectTypeIndexers(
  signatures: TSTypeElement[],
  node: ObjectTypeAnnotation,
  state: PluginPass,
): TSTypeElement[] {
  const { indexers } = node;

  if (indexers) {
    indexers.forEach(indexer => {
      const { id, key } = indexer;
      const typeAnnotation = tsTypeAnnotation(
        convertFlowType(indexer.value, state),
      );

      // TypeScript only allows number or string as key type. Add both index
      // signatures if another type is used in Flow.
      const isValidKeyType =
        isNumberTypeAnnotation(key) || isStringTypeAnnotation(key);

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

        logWarning(
          WARNINGS.indexSignatures.invalidKey,
          state.file.code,
          indexer.loc,
        );
      }
    });
  }

  return signatures;
}

export function convertObjectTypeAnnotation(
  node: ObjectTypeAnnotation,
  state: PluginPass,
): TSObjectKeyword | TSTypeLiteral {
  const { callProperties, indexers, internalSlots, properties } = node;

  if (
    propIsEmpty(callProperties) &&
    propIsEmpty(indexers) &&
    propIsEmpty(internalSlots) &&
    propIsEmpty(properties)
  ) {
    return tsObjectKeyword();
  }

  let signatures: TSTypeElement[] = [];

  properties.forEach(prop => {
    if (isObjectTypeProperty(prop)) {
      if (isFunctionTypeAnnotation(prop.value) && prop.method) {
        signatures.push(createMethodSignature(prop, state));
      } else {
        signatures.push(createPropertySignature(prop, state));
      }
    }

    if (isObjectTypeSpreadProperty(prop)) {
      logWarning(
        WARNINGS.objectTypeSpreadProperty,
        state.file.code,
        prop.argument.loc,
      );
    }
  });

  signatures = convertObjectTypeCallProperties(signatures, node, state);
  signatures = convertObjectTypeIndexers(signatures, node, state);

  return tsTypeLiteral(signatures);
}
