// See https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-flow-strip-types

import { Comment, Program } from '@babel/types';
import { VisitorFunction } from '../types';

export const FLOW_DIRECTIVE = /(@flow(\s+(strict(-local)?|weak))?|@noflow)/;

export const programVisitor: VisitorFunction<Program> = (path, state): void => {
  const comments: Comment[] = state.file.ast.comments;

  if (comments) {
    comments.forEach(comment => {
      if (FLOW_DIRECTIVE.test(comment.value)) {
        comment.value = comment.value.replace(FLOW_DIRECTIVE, '');

        // Remove the remaining comment completely if it consists of stars or whitespace only
        if (!comment.value.replace(/\*/g, '').trim()) {
          // @ts-ignore
          comment.ignore = true;
        }
      }
    });
  }
};
