import {
  identifier,
  Identifier,
  isIdentifier,
  isObjectTypeProperty,
  isObjectTypeSpreadProperty,
  isStringLiteral,
  isTSPropertySignature,
  isTSTypeLiteral,
  ObjectTypeAnnotation,
  ObjectTypeProperty,
  ObjectTypeSpreadProperty,
  StringLiteral,
  tsIndexSignature,
  TSIndexSignature,
  tsPropertySignature,
  TSPropertySignature,
  tsTypeAnnotation,
  tsTypeLiteral,
  TSTypeLiteral,
  tsUnionType,
  ObjectTypeIndexer,
} from '@babel/types';
import { convertFlowType } from './flow-type';

type Signature = TSIndexSignature | TSPropertySignature;
type SignatureKey = Identifier | StringLiteral;

function signatureKeysAreEqual(signature: Signature, key: SignatureKey): boolean {
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

  return false;
}

function replaceProperty(
  props: Signature[],
  key: SignatureKey,
  updatedProp: TSPropertySignature,
): Signature[] {
  return props.map(prop => (signatureKeysAreEqual(prop, key) ? updatedProp : prop));
}

function createPropertySignature(prop: ObjectTypeProperty): TSPropertySignature {
  const { key, optional, variance } = prop;
  const propSignature = tsPropertySignature(key, tsTypeAnnotation(convertFlowType(prop.value)));

  propSignature.optional = optional;
  propSignature.readonly = variance && variance.kind === 'plus';

  return propSignature;
}

function convertObjectTypeSpreadProperty(
  node: ObjectTypeAnnotation,
  props: Signature[],
  prop: ObjectTypeSpreadProperty,
): Signature[] {
  const type = convertFlowType(prop.argument);

  if (isTSTypeLiteral(type)) {
    type.members.forEach(innerProp => {
      if (isTSPropertySignature(innerProp) && innerProp.typeAnnotation) {
        const { key } = innerProp;

        if (!isIdentifier(key) && !isStringLiteral(key)) {
          return;
        }

        const parentProp = props.find(prop => signatureKeysAreEqual(prop, key));

        if (parentProp && parentProp.typeAnnotation) {
          if (node.exact) {
            // Overwrite parent property signature with the object spread one, when exact object
            // notation is used.
            props = replaceProperty(props, key, tsPropertySignature(key, innerProp.typeAnnotation));
          } else {
            // Extend the type of the parent property signature with an union of its own type and
            // the type of the object spread property otherwise.
            props = replaceProperty(
              props,
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
          props.push(innerProp);
        }
      }
    });
  }

  return props;
}

function convertObjectTypeIndexer(props: Signature[], indexer: ObjectTypeIndexer): Signature[] {
  const key = indexer.id || identifier('key');
  key.typeAnnotation = tsTypeAnnotation(convertFlowType(indexer.key));

  const typeAnnotation = tsTypeAnnotation(convertFlowType(indexer.value));
  const propIndexSignature = tsIndexSignature([key], typeAnnotation);

  props.push(propIndexSignature);

  return props;
}

export function convertObjectTypeAnnotation(node: ObjectTypeAnnotation): TSTypeLiteral {
  const { indexers, properties } = node;
  let props: Signature[] = [];

  properties.forEach(prop => {
    if (isObjectTypeProperty(prop)) {
      props.push(createPropertySignature(prop));
    }
  });

  // Handle spread properties in a second run, so that all "ordinary" props are already transformed
  // and can be accessed when merging spread properties with them.
  properties.forEach(prop => {
    if (isObjectTypeSpreadProperty(prop)) {
      props = convertObjectTypeSpreadProperty(node, props, prop);
    }
  });

  if (indexers) {
    indexers.forEach(indexer => {
      props = convertObjectTypeIndexer(props, indexer);
    });
  }

  return tsTypeLiteral(props);
}
