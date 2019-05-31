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
import { ConverterState } from '../types';
import { convertFlowType } from './flow-type';
import { functionTypeParametersToIdentifiers } from './function';
import { convertInterfaceDeclaration } from './interface';
import {
  convertTypeParameterDeclaration,
  convertTypeParameterInstantiation,
} from './type-parameter';

function isConstructor(key: Identifier | StringLiteral): boolean {
  const methodName = isIdentifier(key) ? key.name : key.value;

  return methodName === 'constructor';
}

function createClassBody(node: ObjectTypeAnnotation, state: ConverterState): ClassBody {
  return classBody(
    node.properties.map(prop => {
      if (isObjectTypeProperty(prop)) {
        // @ts-ignore prop.method: boolean exists
        if (prop.method && isFunctionTypeAnnotation(prop.value)) {
          const { value, key } = prop;

          const typeParameters = convertTypeParameterDeclaration(value.typeParameters, state);
          const params = functionTypeParametersToIdentifiers(value.params, state) || [];

          const returnType = isConstructor(key)
            ? null
            : tsTypeAnnotation(convertFlowType(value.returnType, state));

          const method = tsDeclareMethod(null, key, typeParameters, params, returnType);

          method.optional = prop.optional;
          method.static = prop.static;

          return method;
        } else {
          const classProp = classProperty(prop.key);

          classProp.typeAnnotation = tsTypeAnnotation(convertFlowType(prop.value, state));
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

export function convertDeclareClass(
  node: DeclareClass,
  state: ConverterState,
  declare: boolean = true,
): ClassDeclaration {
  const classDec = classDeclaration(node.id, null, createClassBody(node.body, state));

  classDec.declare = declare;
  classDec.typeParameters = convertTypeParameterDeclaration(node.typeParameters, state);

  node.extends &&
    node.extends.forEach(_extend => {
      if (isIdentifier(_extend.id)) {
        classDec.superClass = _extend.id;
        classDec.superTypeParameters = convertTypeParameterInstantiation(
          _extend.typeParameters,
          state,
        );
      }
    });

  return classDec;
}

export function convertDeclareFunction(
  node: DeclareFunction,
  state: ConverterState,
  declare: boolean = true,
): TSDeclareFunction {
  const { id } = node;
  let functionDec: TSDeclareFunction | null = null;

  if (
    isTypeAnnotation(id.typeAnnotation) &&
    isFunctionTypeAnnotation(id.typeAnnotation.typeAnnotation)
  ) {
    const { typeAnnotation } = id.typeAnnotation;
    const typeParameters = convertTypeParameterDeclaration(typeAnnotation.typeParameters, state);
    const returnType = tsTypeAnnotation(convertFlowType(typeAnnotation.returnType, state));
    const params = functionTypeParametersToIdentifiers(typeAnnotation.params, state) || [];

    functionDec = tsDeclareFunction(id, typeParameters, params, returnType);
  } else {
    functionDec = tsDeclareFunction(id, null, []);
  }

  functionDec.declare = declare;

  return functionDec;
}

export function convertDeclareInterface(
  node: DeclareInterface,
  state: ConverterState,
  declare: boolean = true,
): TSInterfaceDeclaration {
  const interfaceDec = convertInterfaceDeclaration(node, state);
  interfaceDec.declare = declare;

  return interfaceDec;
}

function convertModuleStatement(statement: Statement | Flow, state: ConverterState): Declaration {
  if (isDeclareClass(statement)) {
    return convertDeclareClass(statement, state, false);
  }

  if (isDeclareFunction(statement)) {
    return convertDeclareFunction(statement, state, false);
  }

  if (isDeclareInterface(statement)) {
    return convertDeclareInterface(statement, state, false);
  }

  if (isDeclareVariable(statement)) {
    return variableDeclaration('var', [variableDeclarator(statement.id)]);
  }

  if (isInterfaceDeclaration(statement)) {
    return convertInterfaceDeclaration(statement, state);
  }

  throw new NotImplementedError(`No conversion for ${statement.type}`);
}

export function convertDeclareModule(
  node: DeclareModule,
  state: ConverterState,
): TSModuleDeclaration {
  const statements = node.body.body.reduce<Statement[]>((acc, statement) => {
    if (isDeclareExportDeclaration(statement) && statement.declaration) {
      const { declaration, specifiers } = statement;

      if (statement.default) {
        // Arbitrary expressions are forbidden in export assignments in ambient
        // contexts in TS. So add a `_default` property, initialize it with the
        // Flow expression and export that by default (https://bit.ly/2Wi3b88).
        const defaultExport = isFlowType(declaration)
          ? convertFlowType(declaration, state)
          : declaration;
        const defaultPropId = identifier('_default');

        defaultPropId.typeAnnotation = isTSType(defaultExport)
          ? tsTypeAnnotation(defaultExport)
          : null;

        const defaultProp = variableDeclaration('const', [variableDeclarator(defaultPropId)]);

        acc.push(defaultProp);
        acc.push(exportDefaultDeclaration(identifier('_default')));
      } else {
        acc.push(
          exportNamedDeclaration(convertModuleStatement(declaration, state), specifiers || []),
        );
      }
    } else {
      acc.push(convertModuleStatement(statement, state));
    }

    return acc;
  }, []);

  const moduleDec = tsModuleDeclaration(node.id, tsModuleBlock(statements));
  moduleDec.declare = true;

  return moduleDec;
}

export function convertDeclareTypeAlias(
  node: DeclareTypeAlias,
  state: ConverterState,
): TSTypeAliasDeclaration {
  const typeParameters = convertTypeParameterDeclaration(node.typeParameters, state);
  const typeAliasDec = tsTypeAliasDeclaration(
    node.id,
    typeParameters,
    convertFlowType(node.right, state),
  );

  typeAliasDec.declare = true;

  return typeAliasDec;
}
