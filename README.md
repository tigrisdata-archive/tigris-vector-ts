# Tigris Vector Database Client Library for TypeScript

[![build](https://github.com/tigrisdata/tigris-vector-ts/actions/workflows/ts-ci.yml/badge.svg?branch=main)](https://github.com/tigrisdata/tigris-vector-ts/actions/workflows/ts-ci.yml)
[![codecov](https://codecov.io/gh/tigrisdata/tigris-vector-ts/branch/main/graph/badge.svg)](https://codecov.io/gh/tigrisdata/tigris-vector-ts)
[![GitHub](https://img.shields.io/github/license/tigrisdata/tigris-vector-ts)](https://github.com/tigrisdata/tigris-vector-ts/blob/main/LICENSE)
[![Discord](https://img.shields.io/discord/1033842669983633488?color=%23596fff&label=Discord&logo=discord&logoColor=%23ffffff)](https://tigris.dev/discord)
[![Twitter Follow](https://img.shields.io/twitter/follow/tigrisdata?style=social)](https://twitter.com/tigrisdata)

# Documentation

- [Vector Search Overview](https://www.tigrisdata.com/docs/concepts/vector-search/)
- [Getting Started](https://www.tigrisdata.com/docs/quickstarts/quickstart-vector-search/)

# Building

```
# clean the dev env
npm run clean

# build
npm run build

# test
npm run test

# lint
npm run lint
```

# Code Quality

## 1. Linting

The coding style rules are defined by [Prettier](https://prettier.io/) and
enforced by [Eslint](https://eslint.org)

## 2. Git Hooks

We use [pre-commit](https://pre-commit.com/index.html) to automatically
setup and run git hooks.

Install the pre-commit hooks as follows:

```shell
pre-commit install
```

On every `git commit` we check the code quality using prettier and eslint.

# License

This software is licensed under the [Apache 2.0](LICENSE).

# Contributors

Thanks to all the people who contributed!

<a href="https://github.com/tigrisdata/tigris-vector-ts/graphs/contributors">
	<img src="https://contrib.rocks/image?repo=tigrisdata/tigris-vector-ts" />
</a>
