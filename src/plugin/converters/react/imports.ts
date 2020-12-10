import { NodePath } from '@babel/traverse';
import {
  ImportDeclaration,
  isIdentifier,
  isImportSpecifier,
  isStringLiteral,
} from '@babel/types';

// See https://flow.org/en/docs/react/types/ and https://www.npmjs.com/package/@types/react
const TYPE_IMPORT_MAP: Map<string, string> = new Map(
  Object.entries({
    Element: 'ReactElement',
    Node: 'ReactNode',
  }),
);

export function convertReactImports(path: NodePath<ImportDeclaration>): void {
  const { node } = path;

  if (node.source.value !== 'react') {
    return;
  }

  node.specifiers.forEach(specifier => {
    if (isImportSpecifier(specifier) && specifier.importKind === 'type') {
      const { local, imported } = specifier;

      if (isIdentifier(imported)) {
        if (TYPE_IMPORT_MAP.has(local.name)) {
          path.scope.rename(local.name, TYPE_IMPORT_MAP.get(local.name));
          imported.name = local.name;
        } else if (TYPE_IMPORT_MAP.has(imported.name)) {
          imported.name = TYPE_IMPORT_MAP.get(imported.name) as string;
        }
      }

      if (isStringLiteral(imported)) {
        if (TYPE_IMPORT_MAP.has(local.name)) {
          path.scope.rename(local.name, TYPE_IMPORT_MAP.get(local.name));
          imported.value = local.name;
        } else if (TYPE_IMPORT_MAP.has(imported.value)) {
          imported.value = TYPE_IMPORT_MAP.get(imported.value) as string;
        }
      }
    }

    return specifier;
  });
}
