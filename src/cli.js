#!/usr/bin/env node

const { program } = require('commander');
const add = require('./commands/add');
const { parseStatusCode } = require('./utils');
const { name, version } = require('../package.json');

program.name(name).version(version, '-v, --version', 'Output the current version.');

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
