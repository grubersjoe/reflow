export interface PluginWarning {
  message: string;
  see?: string;
}

interface WarningsLogger {
  getWarnings: () => Set<PluginWarning>;
  enable: (warning: PluginWarning) => void;
}

function createWarningsLogger(): WarningsLogger {
  const warnings: Set<PluginWarning> = new Set();

  return {
    getWarnings() {
      return warnings;
    },
    enable(warning) {
      warnings.add(warning);
    },
  };
}

export const WARNINGS = {
  ExistsTypeAnnotation: {
    message: `Flow's Existential Type (*) is not expressible in TypeScript. It will be replaced with 'any'.`,
    see: 'https://github.com/Microsoft/TypeScript/issues/14466',
  },
  OpaqueType: {
    message: `Flow's Opaque type is not expressible in TypeScript and will be replaced with a type alias. Subtyping constraints will be lost!`,
    see: `https://github.com/Microsoft/TypeScript/issues/202`,
  },
  GenericTypeAnnotation: {
    Variance: {
      message: `Flow's variance sigils (+T, -T) for type parameters are not supported in TypeScript. They will be omitted.`,
      see: `https://github.com/Microsoft/TypeScript/issues/10717`,
    },
  },
};

export const PluginWarnings = createWarningsLogger();
