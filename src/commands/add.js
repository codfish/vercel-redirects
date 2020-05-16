const path = require('path');
const chalk = require('chalk');
const {
  loadConfig,
  loadVercelConfig,
  writeVercelConfig,
  gitPull,
  gitCommitAndPush,
  shorten,
  validateUniqueness,
} = require('../utils');

/**
 * Add a new redirect to your Vercel project configuration.
 *
 * Examples
 *
 *    add('/destination-url')
 *    add('https://codfish.io')
 *    add('/destination-path', '/source-path')
 *    add('https://codfish.io', '/personal-site')
 *    add('https://codfish.io', undefined, { statusCode: 302 })
 *
 * @see {@link https://vercel.com/docs/configuration#project/redirects}
 *
 * @param {string} destination - A location destination defined as an absolute pathname or external URL.
 * @param {string} [source] - A pattern that matches each incoming pathname (excluding querystring).
 * @param {Command} [options] - Command options.
 * @param {number} [options.statusCode] - An optional HTTP status code in the 301-308 range (default 308).
 * @return {object} - Redirect object.
 */
async function add(destination, source, options = {}) {
  const config = await loadConfig();
  const [vercelConfigPath, vercelConfig] = await loadVercelConfig();
  const cwd = path.dirname(vercelConfigPath);

  validateUniqueness(source, vercelConfig.redirects);

  if (config.autoPush) {
    console.log('Syncing repo...');
    await gitPull(cwd);
  }

  // generate a short url if no source was provided
  if (!source) {
    // eslint-disable-next-line no-param-reassign
    source = await shorten(destination);
  }

  vercelConfig.redirects.unshift({
    source,
    destination,
    statusCode: options.statusCode,
  });

  // update file
  await writeVercelConfig(vercelConfig, vercelConfigPath);

  console.log('Redirect added successfully.');
  console.log(`  > ${chalk.green(source)} now redirects to ${chalk.green(destination)}\n`);

  if (config.autoPush) {
    console.log('Deploying new redirect...');
    await gitCommitAndPush(`feat: new redirect, ${source} -> ${destination}`, cwd);
  }
}

module.exports = add;
