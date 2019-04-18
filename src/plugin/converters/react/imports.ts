import { NodePath } from '@babel/traverse';
import { ImportDeclaration, isImportSpecifier } from '@babel/types';

const TYPE_IMPORT_MAP: Map<string, string> = new Map();

TYPE_IMPORT_MAP.set('Node', 'ReactNode');

export function convertReactImports(path: NodePath<ImportDeclaration>): void {
  const { node } = path;

  if (node.source.value !== 'react') {
    return;
  }

  node.specifiers.forEach(specifier => {
    if (isImportSpecifier(specifier) && specifier.importKind === 'type') {
      const { local, imported } = specifier;

      if (TYPE_IMPORT_MAP.has(local.name)) {
        path.scope.rename(local.name, TYPE_IMPORT_MAP.get(local.name) as string);
        imported.name = local.name;
      } else if (TYPE_IMPORT_MAP.has(imported.name)) {
        imported.name = TYPE_IMPORT_MAP.get(imported.name) as string;
      }
    }

    return specifier;
  });
}
