[![unit-lint-typecheck-e2e-ct](https://github.com/muratkeremozcan/react-cypress-ts-template/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/muratkeremozcan/react-cypress-ts-template/actions/workflows/main.yml)
![react version](https://img.shields.io/badge/react-18.2.0-brightgreen)
![react-scripts version](https://img.shields.io/badge/react--scripts-5.0.1-brightgreen)
![cypress version](https://img.shields.io/badge/cypress-10.6.0-brightgreen)
![typescript version](https://img.shields.io/badge/typescript-4.7.4-brightgreen)
![jest version](https://img.shields.io/badge/jest-28.1.3-brightgreen)
![eslint version](https://img.shields.io/badge/eslint-8.22.0-brightgreen)
![prettier version](https://img.shields.io/badge/prettier-2.7.1-brightgreen)
[![renovate-app badge][renovate-badge]][renovate-app]

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/

A template with React, TS, Cypress (e2e & ct), GHA with CI architecture, Jest,
ESLint, Prettier, Renovate, Husky, Lint-staged, and most of the things you need
to get started with a new project.

```bash
yarn install --registry https://registry.yarnpkg.com # specify the registry in case you are using a proprietary registry

# parallel unit, typecheck, lint, format
yarn validate

# no need to have server running for these:
yarn cy:open-ct # for cypress component test runner
yarn cy:run-ct # headless version

# runs the ui and api servers, then opens e2e runner
yarn cy:open-e2e
yarn cy:run-e2e  # headless version

yarn test # run unit tests with jest
```

## CI

```
build  -->  Cypress e2e test
       -->  Cypress component test
       -->  Typecheck
       -->  Lint
       -->  Unit test
```
