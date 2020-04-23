import chalk from 'chalk';

import { SourceLocation, codeFrameColumns } from '@babel/code-frame';
import { UnexpectedError } from '../../util/error';

interface PluginWarning {
  message: string;
  see?: string;
}

export function logWarning(
  warning: PluginWarning,
  code: string,
  location: SourceLocation | null,
): void {
  if (!location) {
    throw new UnexpectedError(
      `No source location given for warning ${warning.message}`,
    );
  }

  let message = `\n  ${chalk.bold.yellowBright('Warning')}: ${warning.message}`;

  if (warning.see) {
    message = message.concat(`\n    See: ${warning.see}`);
  }

  const frame = codeFrameColumns(code, location, {
    message,
    linesAbove: 2,
    linesBelow: 0,
    highlightCode: true,
  });

  console.log(`\n${frame}\n`);
}

export const WARNINGS = {
  class: {
    constructorReturnType: {
      message: `Flow allows to specify the return type of constructor functions. This is forbidden in TypeScript. The constructor return type will be removed.`,
      see: 'https://github.com/Microsoft/TypeScript/issues/11588',
    },
  },
  existsTypeAnnotation: {
    message: `Flow's Existential Type (*) is not expressible in TypeScript. It will be replaced with 'any'.`,
    see: 'https://github.com/Microsoft/TypeScript/issues/14466',
  },
  indexSignatures: {
    invalidKey: {
      message: `TypeScript requires 'string' or 'number' as index signature key type. Reflow will add signatures for both types.`,
      see:
        'https://www.typescriptlang.org/docs/handbook/interfaces.html#indexable-types',
    },
  },
  genericTypeAnnotation: {
    variance: {
      message: `Flow's variance sigils (+T, -T) for type parameters are not supported in TypeScript. They will be omitted.`,
      see: `https://github.com/Microsoft/TypeScript/issues/10717`,
    },
  },
  objectTypeProperty: {
    variance: {
      message: `TypeScript does not support contravariance (-T). All properties will be changed to
      ordinary ones.`,
      see: `https://github.com/Microsoft/TypeScript/issues/10717`,
    },
  },
  objectTypeSpreadProperty: {
    message: `TypeScript does not support object type spread (...T). Such properties will be ommited in output. Please fix affected object types manually.`,
    see: `https://github.com/microsoft/TypeScript/issues/10727`,
  },
  opaqueType: {
    message: `Flow's Opaque type is not expressible in TypeScript and will be replaced with a type alias. Subtyping constraints will be lost!`,
    see: `https://github.com/Microsoft/TypeScript/issues/202`,
  },
};
