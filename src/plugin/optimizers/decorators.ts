import {
  ClassDeclaration,
  callExpression,
  isCallExpression,
  isExportDefaultDeclaration,
  isIdentifier,
} from '@babel/types';
import { NodePath } from '@babel/core';

/**
 * This is an *optional* feature and has been created to meet our specific
 * requirements at TeamShirts: It can be enabled by passing the
 * --replaceDecorators to Reflow. While TypeScript supports decorators, it's
 * not an easy task to correctly type them. Therefore we decided to remove
 * decorators and to pass the exported class as argument to the decorator
 * function. So this example code would be transformed as follows:
 *
 * @decorator
 * class C {}           =>    class C {}
 * export default C;    =>    export default decorator(C);
 */

export function replaceClassDecorators(
  path: NodePath<ClassDeclaration>,
): NodePath<ClassDeclaration> {
  const { node } = path;

  if (!node.decorators) {
    return path;
  }

  if (isIdentifier(node.id)) {
    // Find bindings of the class name
    const binding = path.scope.getBinding(node.id.name);

    if (binding && binding.referencePaths.length) {
      binding.referencePaths.forEach(refPath => {
        const { parent: defaultExport } = refPath;

        // Search for exports with this binding
        if (isExportDefaultDeclaration(defaultExport) && node.decorators) {
          // Add a call expression for every decorator recursively. Also note
          // the call to reverse() to achieve nesting in correct order.
          node.decorators.reverse().forEach(decorator => {
            const { declaration } = defaultExport;

            if (isIdentifier(declaration) || isCallExpression(declaration)) {
              defaultExport.declaration = callExpression(decorator.expression, [
                declaration,
              ]);
            }
          });
        }
      });
    }

    // Finally delete the decorators
    node.decorators = null;
  }

  return path;
}
