import {
  ClassBody,
  ClassDeclaration,
  Declaration,
  DeclareClass,
  DeclareFunction,
  DeclareInterface,
  DeclareModule,
  DeclareTypeAlias,
  Flow,
  Identifier,
  ObjectTypeAnnotation,
  Statement,
  StringLiteral,
  TSDeclareFunction,
  TSInterfaceDeclaration,
  TSModuleDeclaration,
  TSTypeAliasDeclaration,
  classBody,
  classDeclaration,
  classProperty,
  exportDefaultDeclaration,
  exportNamedDeclaration,
  identifier,
  isDeclareClass,
  isDeclareExportDeclaration,
  isDeclareFunction,
  isDeclareInterface,
  isDeclareVariable,
  isFlowType,
  isFunctionTypeAnnotation,
  isIdentifier,
  isInterfaceDeclaration,
  isObjectTypeProperty,
  isTSType,
  isTypeAnnotation,
  tsDeclareFunction,
  tsDeclareMethod,
  tsModuleBlock,
  tsModuleDeclaration,
  tsTypeAliasDeclaration,
  tsTypeAnnotation,
  variableDeclaration,
  variableDeclarator,
} from '@babel/types';

import { UnexpectedError, NotImplementedError } from '../../util/error';
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

function createClassBody(node: ObjectTypeAnnotation): ClassBody {
  return classBody(
    node.properties.map(prop => {
      if (isObjectTypeProperty(prop)) {
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

export function convertDeclareClass(node: DeclareClass, declare: boolean = true): ClassDeclaration {
  const classDec = classDeclaration(node.id, null, createClassBody(node.body));

  classDec.declare = declare;
  classDec.typeParameters = convertTypeParameterDeclaration(node.typeParameters);

  node.extends &&
    node.extends.forEach(_extend => {
      if (isIdentifier(_extend.id)) {
        classDec.superClass = _extend.id;
        classDec.superTypeParameters = convertTypeParameterInstantiation(_extend.typeParameters);
      }
    });

  return classDec;
}

export function convertDeclareFunction(
  node: DeclareFunction,
  declare: boolean = true,
): TSDeclareFunction {
  const { id } = node;
  let functionDec: TSDeclareFunction | null = null;

  if (
    isTypeAnnotation(id.typeAnnotation) &&
    isFunctionTypeAnnotation(id.typeAnnotation.typeAnnotation)
  ) {
    const { typeAnnotation } = id.typeAnnotation;
    const typeParameters = convertTypeParameterDeclaration(typeAnnotation.typeParameters);
    const returnType = tsTypeAnnotation(convertFlowType(typeAnnotation.returnType));
    const params = functionTypeParametersToIdentifiers(typeAnnotation.params) || [];

    functionDec = tsDeclareFunction(id, typeParameters, params, returnType);
  } else {
    functionDec = tsDeclareFunction(id, null, []);
  }

  functionDec.declare = declare;

  return functionDec;
}

export function convertDeclareInterface(
  node: DeclareInterface,
  declare: boolean = true,
): TSInterfaceDeclaration {
  const interfaceDec = convertInterfaceDeclaration(node);
  interfaceDec.declare = declare;

  return interfaceDec;
}

function convertModuleStatement(statement: Statement | Flow): Declaration {
  if (isDeclareClass(statement)) {
    return convertDeclareClass(statement, false);
  }

  if (isDeclareFunction(statement)) {
    return convertDeclareFunction(statement, false);
  }

  if (isDeclareInterface(statement)) {
    return convertDeclareInterface(statement, false);
  }

  if (isDeclareVariable(statement)) {
    return variableDeclaration('var', [variableDeclarator(statement.id)]);
  }

  if (isInterfaceDeclaration(statement)) {
    return convertInterfaceDeclaration(statement);
  }

  throw new NotImplementedError(`No conversion for ${statement.type}`);
}

export function convertDeclareModule(node: DeclareModule): TSModuleDeclaration {
  const statements = node.body.body.reduce<Statement[]>((acc, statement) => {
    if (isDeclareExportDeclaration(statement) && statement.declaration) {
      const { declaration, specifiers } = statement;

      if (statement.default) {
        // Arbitrary expressions are forbidden in export assignments in ambient
        // contexts in TS. So add a `_default` property, initialize it with the
        // Flow expression and export that by default (https://bit.ly/2Wi3b88).
        const defaultExport = isFlowType(declaration) ? convertFlowType(declaration) : declaration;
        const defaultPropId = identifier('_default');

        defaultPropId.typeAnnotation = isTSType(defaultExport)
          ? tsTypeAnnotation(defaultExport)
          : null;

        const defaultProp = variableDeclaration('const', [variableDeclarator(defaultPropId)]);

        acc.push(defaultProp);
        acc.push(exportDefaultDeclaration(identifier('_default')));
      } else {
        acc.push(exportNamedDeclaration(convertModuleStatement(declaration), specifiers || []));
      }
    } else {
      acc.push(convertModuleStatement(statement));
    }

    return acc;
  }, []);

  const moduleDec = tsModuleDeclaration(node.id, tsModuleBlock(statements));
  moduleDec.declare = true;

  return moduleDec;
}

export function convertDeclareTypeAlias(node: DeclareTypeAlias): TSTypeAliasDeclaration {
  const typeParameters = convertTypeParameterDeclaration(node.typeParameters);
  const typeAliasDec = tsTypeAliasDeclaration(node.id, typeParameters, convertFlowType(node.right));

  typeAliasDec.declare = true;

  return typeAliasDec;
}
