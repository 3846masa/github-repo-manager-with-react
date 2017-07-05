# github-repo-manager-with-react

[![Greenkeeper badge](https://badges.greenkeeper.io/3846masa/github-repo-manager-with-react.svg)](https://greenkeeper.io/)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Search GitHub repos and Set repos to watch/unwatch.

![screencap](https://i.imgur.com/kli9RIE.gif)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Development](#development)
- [License](#license)

## Install

1. Clone it
```shell
git clone https://github.com/3846masa/github-repo-manager-with-react
```

2. Install depenencies
```shell
yarn install
```

3. Create GitHub Token via [here](https://github.com/settings/tokens).
  - You must allow `repo` and `user` scopes.

4. Build
  - Set GitHub Token to `GITHUB_TOKEN` env when building.
```shell
GITHUB_TOKEN="YOUR_TOKEN" yarn run build
```

## Usage

- Open `dist/index.html` or Run `yarn run serve`

### What you can do

- Check your watched repositories
- Search repositories
  - Filter by language
  - Sort by any options
- Toggle watch/unwatch state of repositories

#### Search repositories

![search](https://i.imgur.com/LN3gg6X.gif)

#### Toggle watch/unwatch

You can set watch/unwatch to all repos in page at once.

![toggle](https://i.imgur.com/Mwr6Bcx.gif)

## Development

### Watch

```shell
GITHUB_TOKEN="YOUR_TOKEN" yarn run watch
# Open http://localhost:8000
```

### Clean build caches

If you change `fuse.js` or install dependencies, you should clean caches.

```shell
yarn run clean:deep
```

### Commit

We use [commitizen style](https://github.com/commitizen/cz-cli).

```shell
# Instead of `git commit`
yarn run cz
```

## License

MIT © 3846masa
