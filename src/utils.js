const crypto = require('crypto');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const findUp = require('find-up');

function parseStatusCode(code) {
  const codeInt = parseInt(code, 10);
  if (codeInt < 301 || codeInt > 308) {
    console.error(`error: invalid status code ${code}`);
    process.exit(1);
  }
  return codeInt;
}

/**
 * Load vercel-redirects cli configuration.
 */
async function loadConfig() {
  const pkgPath = await findUp('package.json');
  const pkg = pkgPath ? await loadJsonFile(pkgPath) : {};

  let config = pkg['vercel-redirects'];
  if (!config) {
    const rcPath = await findUp(['.vercelredirectsrc.json', '.vercelredirectsrc']);
    config = rcPath ? await loadJsonFile(rcPath) : null;
  }

  return config || { autoPush: false };
}

/**
 * Load vercel.json configuration.
 */
async function loadVercelConfig() {
  const configPath = await findUp(['vercel.json', 'now.json']);
  const config = await loadJsonFile(configPath);
  return [configPath, config];
}

/**
 * Write to vercel.json configuration.
 *
 * @param {object} config - Full vercel.json config object.
 * @param {object} configPath - Full path to configuration file.
 */
async function writeVercelConfig(config, configPath) {
  let path = configPath;
  if (!path) {
    path = await findUp(['vercel.json', 'now.json']);
  }
  return writeJsonFile(path, config, { indent: '  ', detectIndent: true });
}

function gitPull(cwd) {
  return exec('git pull', { stdio: 'inherit', cwd });
}

async function gitCommitAndPush(message = 'feat: new redirect', cwd) {
  await exec(`git commit -am "${message}"`, { stdio: 'inherit', cwd });
  await exec('git push', { stdio: 'inherit', cwd });
}

async function shorten(longUrl) {
  return `/${await crypto
    .createHash('md5')
    .update(longUrl + Date.now())
    .digest('hex')
    .substring(0, 4)}`;
}

function validateUniqueness(source, redirects) {
  const existingRedirect = redirects.find(redirect => redirect.source === source);
  if (existingRedirect) {
    console.error(`error: ${source} already redirects to ${existingRedirect.destination}`);
    process.exit(1);
  }
  return true;
}

module.exports = {
  parseStatusCode,
  loadConfig,
  loadVercelConfig,
  writeVercelConfig,
  gitPull,
  gitCommitAndPush,
  shorten,
  validateUniqueness,
};
