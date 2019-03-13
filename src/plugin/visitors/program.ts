// See https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-flow-strip-types

import { Comment, Program } from '@babel/types';
import { VisitNodeFunction } from '@babel/traverse';

const FLOW_DIRECTIVE = /(@flow(\s+(strict(-local)?|weak))?|@noflow)/;

export const programVisitor: VisitNodeFunction<object, Program> = (path, state): void => {
  const comments = (state as PluginPass<Program>).file.ast.comments as Comment[];

  if (comments) {
    comments.forEach(comment => {
      if (FLOW_DIRECTIVE.test(comment.value)) {
        // Remove the Flow directive
        comment.value = comment.value.replace(FLOW_DIRECTIVE, '');

        // Remove the comment completely if only whitespace or stars is left
        if (!comment.value.replace(/\*/g, '').trim()) {
          // @ts-ignore
          comment.ignore = true;
        }
      }
    });
  }
};
