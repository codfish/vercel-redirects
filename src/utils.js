import childProcess from 'child_process';
import crypto from 'crypto';
import util from 'util';
import { loadJsonFile } from 'load-json-file';
import { writeJsonFile } from 'write-json-file';
import { findUp } from 'find-up';
import chalk from 'chalk';

const exec = util.promisify(childProcess.exec);

export function parseStatusCode(code) {
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
export async function loadConfig() {
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
 * Write to vercel.json configuration.
 *
 * @param {object} config - Full vercel.json config object.
 * @param {object} [configPath] - Full path to configuration file.
 */
export async function writeVercelConfig(config, configPath) {
  let path = configPath;
  if (!path) {
    path = await findUp(['vercel.json', 'now.json']);
  }
  return writeJsonFile(path, config, { indent: '  ', detectIndent: true });
}

/**
 * Load vercel.json configuration.
 */
export async function loadVercelConfig() {
  const configPath = await findUp(['vercel.json', 'now.json']);
  if (!configPath) {
    console.warn(
      '\n',
      chalk.yellow(
        `[vercel-redirects]: Could not find vercel config file. Creating ${chalk.cyan(
          'vercel.json',
        )}.`,
      ),
      '\n',
    );
    const pkgPath = await findUp('package.json');
    const path = pkgPath.replace('package.json', 'vercel.json');
    const config = { redirects: [] };
    await writeVercelConfig(config, path);
    return [path, config];
  }
  const config = await loadJsonFile(configPath);
  return [configPath, config];
}

export function gitPull(cwd) {
  return exec('git pull', { stdio: 'inherit', cwd });
}

export async function gitCommitAndPush(message = 'feat: new redirect', cwd) {
  await exec(`git commit -am "${message}"`, { stdio: 'inherit', cwd });
  await exec('git push', { stdio: 'inherit', cwd });
}

export async function shorten(longUrl) {
  return `/${await crypto
    .createHash('md5')
    .update(longUrl + Date.now())
    .digest('hex')
    .substring(0, 4)}`;
}

export function validateUniqueness(source, redirects = []) {
  const existingRedirect = redirects.find(redirect => redirect.source === source);
  if (existingRedirect) {
    console.error(`error: ${source} already redirects to ${existingRedirect.destination}`);
    process.exit(1);
  }
  return true;
}
