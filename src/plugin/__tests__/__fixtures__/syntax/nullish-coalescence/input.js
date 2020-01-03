// @flow
const nullishSimple = undefined ?? 'default';
const nullishNested = 3 ?? (undefined ?? null);
const nullishWithType: boolean = null ?? true;
