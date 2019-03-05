// See https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-flow-strip-types/src/index.js

import t, { Comment } from '@babel/types';
import { VisitNodeFunction } from '@babel/traverse';

const FLOW_DIRECTIVE = /(@flow(\s+(strict(-local)?|weak))?|@noflow)/;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Program: VisitNodeFunction<any, t.Program> = (path, state): void => {
  const { comments } = state.file.ast;

  if (comments) {
    (comments as Comment[]).forEach(comment => {
      if (FLOW_DIRECTIVE.test(comment.value)) {
        // Remove Flow directive
        comment.value = comment.value.replace(FLOW_DIRECTIVE, '');

        // Remove the comment completely if there is only whitespace or stars left
        if (!comment.value.replace(/\*/g, '').trim()) {
          // @ts-ignore
          comment.ignore = true;
        }
      }
    });
  }
};

export { Program };
