import {
  ClassBody,
  ClassDeclaration,
  DeclareClass,
  DeclareFunction,
  DeclareTypeAlias,
  Identifier,
  ObjectTypeAnnotation,
  StringLiteral,
  TSDeclareFunction,
  TSTypeAliasDeclaration,
  classBody,
  classDeclaration,
  classProperty,
  isFunctionTypeAnnotation,
  isIdentifier,
  isObjectTypeProperty,
  isTypeAnnotation,
  isTypeParameterDeclaration,
  tsDeclareFunction,
  tsDeclareMethod,
  tsTypeAliasDeclaration,
  tsTypeAnnotation,
} from '@babel/types';

import { UnexpectedError } from '../../util/error';
import { convertFlowType } from './flow-type';
import { convertFunctionTypeParam } from './function';
import {
  convertTypeParameterDeclaration,
  convertTypeParameterInstantiation,
} from './type-parameter';

function isConstructor(key: Identifier | StringLiteral): boolean {
  const methodName = isIdentifier(key) ? key.name : key.value;

  return methodName === 'constructor';
}

function buildClassBody(node: ObjectTypeAnnotation): ClassBody {
  return classBody(
    node.properties.map(prop => {
      if (isObjectTypeProperty(prop)) {
        // @ts-ignore prop.method exists!
        if (prop.method && isFunctionTypeAnnotation(prop.value)) {
          const { value, key } = prop;
          const typeParameters = convertTypeParameterDeclaration(value.typeParameters);

          const params = value.params.map((param, i) => {
            return convertFunctionTypeParam(param, value.params.length > 1 ? `p${i + 1}` : `p`);
          });

          const returnType = isConstructor(key)
            ? null
            : tsTypeAnnotation(convertFlowType(value.returnType));

          const method = tsDeclareMethod(null, key, typeParameters, params, returnType);

          method.optional = prop.optional;
          method.static = prop.static;

          return method;
        } else {
          const classProp = classProperty(prop.key);

          classProp.typeAnnotation = tsTypeAnnotation(convertFlowType(prop.value));
          classProp.optional = prop.optional;
          classProp.static = prop.static;

          return classProp;
        }
      } else {
        throw new UnexpectedError(`Unexpected element in class declaration: ${prop.type}`);
      }
    }),
  );
}

export function convertDeclareClass(node: DeclareClass): ClassDeclaration {
  const _class = classDeclaration(node.id, null, buildClassBody(node.body));

  _class.declare = true;
  _class.typeParameters = convertTypeParameterDeclaration(node.typeParameters);

  node.extends &&
    node.extends.forEach(_extend => {
      if (isIdentifier(_extend.id)) {
        _class.superClass = _extend.id;
        _class.superTypeParameters = convertTypeParameterInstantiation(_extend.typeParameters);
      }
    });

  return _class;
}

export function convertDeclareFunction(node: DeclareFunction): TSDeclareFunction {
  const { id } = node;
  let declareFunction: TSDeclareFunction | null = null;

  if (
    isTypeAnnotation(id.typeAnnotation) &&
    isFunctionTypeAnnotation(id.typeAnnotation.typeAnnotation)
  ) {
    const { typeAnnotation } = id.typeAnnotation;

    const typeParameters = convertTypeParameterDeclaration(typeAnnotation.typeParameters);
    const returnType = tsTypeAnnotation(convertFlowType(typeAnnotation.returnType));

    const params = typeAnnotation.params.map((param, i) => {
      return convertFunctionTypeParam(param, typeAnnotation.params.length > 1 ? `p${i + 1}` : `p`);
    });

    declareFunction = tsDeclareFunction(id, typeParameters, params, returnType);
  } else {
    declareFunction = tsDeclareFunction(id, null, []);
  }

  declareFunction.declare = true;

  return declareFunction;
}

export function convertDeclareTypeAlias(node: DeclareTypeAlias): TSTypeAliasDeclaration {
  const typeParameters = isTypeParameterDeclaration(node.typeParameters)
    ? convertTypeParameterDeclaration(node.typeParameters)
    : null;

  const typeAliasDeclaration = tsTypeAliasDeclaration(
    node.id,
    typeParameters,
    convertFlowType(node.right),
  );

  typeAliasDeclaration.declare = true;

  return typeAliasDeclaration;
}
