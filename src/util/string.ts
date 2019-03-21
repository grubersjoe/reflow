export function splitFixtureLines(code: Buffer | string): string[] {
  const BLANK_LINE = /^\s*$/;
  const LINE_COMMENT = /^\s*\/\/.*/;
  const LINE_BREAK = /\r?\n/;

  return code
    .toString()
    .split(LINE_BREAK)
    .filter(line => !line.match(BLANK_LINE) && !line.match(LINE_COMMENT))
    .map(line => line.trim());
}
