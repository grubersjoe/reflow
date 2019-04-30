import {
  ClassBody,
  ClassDeclaration,
  DeclareClass,
  DeclareFunction,
  DeclareInterface,
  DeclareTypeAlias,
  Identifier,
  ObjectTypeAnnotation,
  StringLiteral,
  TSDeclareFunction,
  TSInterfaceDeclaration,
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
import { functionTypeParametersToIdentifiers } from './function';
import {
  convertTypeParameterDeclaration,
  convertTypeParameterInstantiation,
} from './type-parameter';
import { convertInterfaceDeclaration } from './interface';

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
          const params = functionTypeParametersToIdentifiers(value.params) || [];

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
    const params = functionTypeParametersToIdentifiers(typeAnnotation.params) || [];

    declareFunction = tsDeclareFunction(id, typeParameters, params, returnType);
  } else {
    declareFunction = tsDeclareFunction(id, null, []);
  }

  declareFunction.declare = true;

  return declareFunction;
}

export function convertDeclareInterface(node: DeclareInterface): TSInterfaceDeclaration {
  const _interface = convertInterfaceDeclaration(node);
  _interface.declare = true;

  return _interface;
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
