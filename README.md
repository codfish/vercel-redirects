# vercel-redirects

> Command-line utility to manage your Vercel project redirects. Doubles as a url shortener.

[![version][version-badge]][package] [![downloads][downloads-badge]][npmcharts]
[![GitHub Workflow Status][actions-badge]][actions-badge] [![MIT License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs] [![Semantic Release][semantic-release-badge]][semantic-release]
[![Commitizen friendly][commitizen-badge]][commitizen]

![vercel-redirects example usage](https://cl.ly/56dc56e87ac2/Screen%2520Recording%25202020-04-26%2520at%252008.59%2520AM.gif 'Example Usage')

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
  - [Add](#add)
- [Configuration](#configuration)
- [Inspiration](#inspiration)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm](https://www.npmjs.com) which is bundled with
[node](https://nodejs.org/en/). It can be installed as one of your project's `devDependencies` and
used via an npm script.

```sh
npm install --save-dev vercel-redirects
```

```json
{
  "scripts": {
    "shorten": "vercel-redirects"
  }
}
```

You can then then run `npm run shorten <destination-url>`.

You can also install and run this globally.

```sh
npm install -g vercel-redirects
```

Or run it through `npx`.

```sh
npx vercel-redirects https://url.to.redirect.to.com
```

## Usage

Use the cli directly from your command line or as an npm script.

```txt
Usage: vercel-redirects [options] [command]

Options:
  -v, --version                         Output the current version.
  -h, --help                            display help for command

Commands:
  add [options] <destination> [source]  Add a new redirect. Short url is created for you if you dont provide a source.
  help [command]                        display help for command
```

### Add

```txt
Usage: vercel-redirects add [options] <destination> [source]

Add a new redirect. Short url is created for you if you dont provide a source.

Options:
  -c, --status-code <code>  HTTP status code. Must be a value between 301-308.
  -h, --help                display help for command
```

**Note**: This is the default command, so it can be left out if you prefer.

#### Simple

```sh
vercel-redirects add /destination-url /source-url
vercel-redirects /destination-url /source-url
vercel-redirects -c 302 /destination-url /source-url
vercel-redirects --status-code 302 /destination-url /source-url
vercel-redirects https://codfish.io /source-url
```

#### Url Shortener

```sh
vercel-redirects add /destination-url
vercel-redirects /destination-url
vercel-redirects https://codfish.io
vercel-redirects -c 302 https://codfish.io
vercel-redirects --status-code 302 https://codfish.io
```

## Configuration

Add configuration in the following ways (in order of precedence):

1. A `vercel-redirects` object in your `package.json`.
1. A `.vercelredirectsrc.json` file to the root of your project.
1. A `.vercelredirectsrc` file to the root of your project.

**package.json example:**

```json
{
  "vercel-redirects": {
    "autoPush": true
  }
}
```

**.vercelredirectsrc.json and .vercelredirectsrc example:**

```json
{
  "autoPush": true
}
```

| Variable   | Type    | Default | Description                                                                     |
| ---------- | ------- | ------- | ------------------------------------------------------------------------------- |
| `autoPush` | boolean | `false` | Automatically commit and push, effectively deploying whenever changes are made. |

## Inspiration

My own URL shortener project, [r.codfi.sh](http://r.codfi.sh) is a public project I built as a part
of a General Assembly course that allows anyone to shorten a url, a la bit.ly. For a number of
reasons, this project was kind of a pain to maintain for me over the years.

So when I stumbled upon Kent C. Dodd's
[netlify-shortner](https://github.com/kentcdodds/netlify-shortener) & his url shortener
[app tutorial](https://www.youtube.com/watch?v=HL6paXyx6hM), I was motivated to create my own and
migrate my short url domain, `codfi.sh` to use that instead. The ruby app is still up at
[r.codfi.sh](http://r.codfi.sh).

However, I'm a huge fan of Vercel (formally Now) and that's what I personally use for all my
serverless apps. This cli utility was built to help facilitate the creation of redirects & short
urls for Vercel projects, very much in the same vein as `netlify-shortener`.

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release-badge]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[prs]: http://makeapullrequest.com
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[commitizen]: http://commitizen.github.io/cz-cli/
[commitizen-badge]:
  https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square
[npmcharts]: http://npmcharts.com/compare/vercel-redirects
[version-badge]: https://img.shields.io/npm/v/vercel-redirects.svg?style=flat-square
[package]: https://www.npmjs.com/package/vercel-redirects
[downloads-badge]: https://img.shields.io/npm/dm/vercel-redirects.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/vercel-redirects.svg?style=flat-square
[license]: https://github.com/codfish/vercel-redirects/blob/master/LICENSE
[actions]: https://github.com/codfish/vercel-redirects/actions
[actions-badge]:
  https://img.shields.io/github/workflow/status/codfish/vercel-redirects/Release/master?style=flat-square
