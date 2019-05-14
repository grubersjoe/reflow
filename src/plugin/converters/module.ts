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
            // Note: The Flow type won't be transformed here, but will be
            // handled by the TypeofTypeAnnotation converter.
            path.parentPath.replaceWith(typeofTypeAnnotation(path.parent));
          }
        });
      }
    });
  }
}

export function convertImportDeclaration(path: NodePath<ImportDeclaration>): ImportDeclaration {
  convertImportSpecifiers(path);
  convertReactImports(path);

  // Strip Flow's `type` and `typeof` keywords in import declarations.
  path.node.importKind = null;

  return path.node;
}

export function convertImportSpecifier(path: NodePath<ImportSpecifier>): ImportSpecifier {
  convertImportSpecifiers(path);

  // Strip Flow's `type` and `typeof` keywords in import declarations.
  path.node.importKind = null;

  return path.node;
}
