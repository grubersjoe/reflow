import { Flow } from '@babel/types';

import { UnexpectedError } from '../util/error';

export interface PluginWarning {
  message: string;
  see?: string;
}

interface WarningsLogger {
  getWarnings: () => Map<Flow['type'], PluginWarning>;
  warnAbout: (type: Flow['type']) => void;
}

const PLUGIN_WARNINGS: { [type in Flow['type']]?: PluginWarning } = {
  ExistsTypeAnnotation: {
    message: `Flow's Existential Type (*) is not expressible in TypeScript. It will be replaced with 'any'.`,
    see: 'https://github.com/Microsoft/TypeScript/issues/14466',
  },
  OpaqueType: {
    message: `Flow's Opaque type is not expressible in TypeScript and will be replaced with a type alias. Subtyping constraints will be lost!`,
    see: `https://github.com/Microsoft/TypeScript/issues/202`,
  },
};

function createWarningsLogger(): WarningsLogger {
  const occurredWarnings = new Map<Flow['type'], PluginWarning>();

  return {
    getWarnings() {
      return occurredWarnings;
    },
    warnAbout(type: Flow['type']) {
      const warning = PLUGIN_WARNINGS[type];

      if (warning === undefined) {
        throw new UnexpectedError(`Plugin warning missing for type ${type}.`);
      }

      if (!occurredWarnings.has(type)) {
        occurredWarnings.set(type, warning);
      }
    },
  };
}

export const PluginWarnings = createWarningsLogger();
