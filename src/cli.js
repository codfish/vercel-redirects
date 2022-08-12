#!/usr/bin/env node

import { program } from 'commander';
import { createRequire } from 'module';
import add from './commands/add.js';
import { parseStatusCode } from './utils.js';

// Possible alternative in future:
// import packageJson from '../package.json' assert { type: 'json' };
const esmRequire = createRequire(import.meta.url);
const packageJson = esmRequire('../package.json');

program
  .name(packageJson.name)
  .version(packageJson.version, '-v, --version', 'Output the current version.');

/**
 * Add a new redirect.
 *
 * CLI examples
 *
 *    vercel-redirects add /destination-url
 *    vercel-redirects /destination-url
 *    vercel-redirects https://codfish.io
 *    vercel-redirects -c 302 https://codfish.io
 *    vercel-redirects --status-code 302 https://codfish.io
 */
program
  .command('add <destination> [source]', { isDefault: true })
  .description('Add a new redirect. Short url is created for you if you dont provide a source.')
  .option(
    '-c, --status-code <code>',
    'HTTP status code. Must be a value between 301-308.',
    parseStatusCode,
  )
  .action(add);

program.parse(process.argv);
