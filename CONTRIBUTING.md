# Contributing

Thanks for being willing to contribute!

**Working on your first Pull Request?**
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/lessons/javascript-how-to-create-a-pull-request-on-github)

## Project setup

1. Fork and clone the repo
2. Run `npm run setup -s` to install dependencies and run validation
3. Create a branch for your PR with `git checkout -b your-handle/your-branch-name`

> Tip: Keep your `main` branch pointing at the original repository and make pull requests from
> branches on your fork. To do this, run:
>
> ```sh
> git remote add upstream https://github.com/codfish/vercel-redirects.git
> git fetch upstream
> git branch --set-upstream-to=upstream/main main
> ```
>
> This will add the original repository as a "remote" called "upstream," Then fetch the git
> information from that remote, then set your local `main` branch to use the upstream main branch
> whenever you run `git pull`. Then you can make all of your pull request branches based on this
> `main` branch. Whenever you want to update your version of `main`, do a regular `git pull`.

## Help needed

Please checkout the [the open issues][issues].

Also, please watch the repo and respond to questions/bug reports/feature requests! Thanks!

[issues]: https://github.com/codfish/vercel-redirects/issues
