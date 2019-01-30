import { transformSync } from '@babel/core';
import fs from 'fs';

import Logger from '../util/Logger';
import Overflow from '../plugin';

const fileName = process.argv[2];

if (!fileName) {
  throw new Error('No input file specified');
}

fs.readFile(fileName, function(err: NodeJS.ErrnoException, data: Buffer) {
  if (err) {
    throw err;
  }

  const src = data.toString();
  const out = transformSync(src, {
    plugins: [Overflow],
  });

  Logger.printHeading('Input');
  console.log(src.trim());

  console.log('─'.repeat(80));

  Logger.printHeading('Output');

  if (out) {
    console.log(out.code);
  } else {
    console.error('Unable to transform the code!');
  }
});
