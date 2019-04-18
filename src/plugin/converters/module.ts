import { NodePath } from '@babel/traverse';
import {
  ImportDeclaration,
  ImportSpecifier,
  isFlowType,
  isImportDeclaration,
  typeofTypeAnnotation,
} from '@babel/types';

import { convertReactImports } from './react/imports';

function convertImportSpecifiers(path: NodePath<ImportDeclaration | ImportSpecifier>): void {
  const { node } = path;
  const specifiers = isImportDeclaration(node) ? node.specifiers : [node];

  if (node.importKind === 'typeof') {
    specifiers.forEach(specifier => {
      const binding = path.scope.getBinding(specifier.local.name);

      if (binding) {
        binding.referencePaths.map(path => {
          if (isFlowType(path.parent)) {
            // Note: The transformation of the Flow type is not perfomed here, but will be handled
            // by the TypeofTypeAnnotation converter.
            path.parentPath.replaceWith(typeofTypeAnnotation(path.parent));
          }
        });
      }
    });
  }
}

export function convertImportDeclaration(
  node: ImportDeclaration,
  path: NodePath<ImportDeclaration>,
): ImportDeclaration {
  convertImportSpecifiers(path);
  convertReactImports(path);

  // Strip Flow's `type` and `typeof` keywords in import declarations.
  node.importKind = null;

  return node;
}

export function convertImportSpecifier(
  node: ImportSpecifier,
  path: NodePath<ImportSpecifier>,
): ImportSpecifier {
  convertImportSpecifiers(path);

  // Strip Flow's `type` and `typeof` keywords in import declarations.
  node.importKind = null;

  return node;
}
