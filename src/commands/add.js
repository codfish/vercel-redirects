const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const findUp = require('find-up');
const crypto = require('crypto');
const chalk = require('chalk');

/**
 * Add a new redirect to your Vercel project configuration.
 *
 * @see {@link https://vercel.com/docs/configuration#project/redirects}
 *
 * @param {string} destination - A location destination defined as an absolute pathname or external URL.
 * @param {string} [source] - A pattern that matches each incoming pathname (excluding querystring).
 * @param {number} [statusCode] - An optional HTTP status code in the 301-308 range (default 308).
 * @return {object} - Redirect object.
 */
async function add(destination, source, statusCode) {
  const configPath = await findUp(['vercel.json', 'now.json']);
  const config = await loadJsonFile(configPath);

  // generate a short url if no source was provided
  if (!source) {
    // eslint-disable-next-line no-param-reassign
    source = `/${await crypto
      .createHash('md5')
      .update(destination + Date.now())
      .digest('hex')
      .substring(0, 4)}`;
  }

  config.redirects.push({
    source,
    destination,
    statusCode,
  });

  // update file
  await writeJsonFile(configPath, config);

  console.log();
  console.log(chalk.cyan(`Redirect added successfully.`));
  console.log();
  console.log(
    chalk.cyan(`  > ${chalk.green(source)} now redirects to ${chalk.green(destination)}`),
  );
  console.log();
}

module.exports = add;
