# ZEIT ONLINE Frontend-Day / Hackathon 2017

## Prerequisites

Install `node` and `yarn`

```shell
# macOS
brew install node yarn

# *nix
apt-get install node yarn
```

### Calling the [Zeit ONLINE Content-API](http://developer.zeit.de/explorer/)
- Obtain an API-Key from [http://developer.zeit.de/quickstart/](http://developer.zeit.de/quickstart/)
- Provide your API-Secret as an environment-variable in the _.env_ file in the project root directory: `ZON_API_KEY=[Your secret goes here]`

### Installation

- `yarn install` installs all dependencies. Run after cloning the repo.

## Development

- `yarn start` to start the local development server on port 9000.

## Build & Deploy

- `yarn build` generates a production-ready build to the `public` folder inside the root directory.
- `yarn deploy:gh-pages` deploys the contents of the `public` folder to gh-pages. Make sure to have a clean git state and all changes are committed or stashed.

## Bugs & Gotchas

- Make sure Text-to-Speech Voices are installed on the OS.
- The word highlighting breaks sometimes. Related bugs:
    - https://bugzilla.mozilla.org/show_bug.cgi?id=1441503
    - https://bugs.chromium.org/p/chromium/issues/detail?id=816891
