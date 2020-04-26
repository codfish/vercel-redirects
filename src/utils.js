function parseStatusCode(code) {
  const codeInt = parseInt(code, 10);
  if (codeInt < 301 || codeInt > 308) {
    console.error(`error: invalid status code ${code}`);
    process.exit(1);
  }
  return codeInt;
}

module.exports = { parseStatusCode };
