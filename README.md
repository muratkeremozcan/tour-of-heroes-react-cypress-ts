[![codecov](https://codecov.io/gh/muratkeremozcan/tour-of-heroes-react-cypress-ts/branch/main/graph/badge.svg?token=rzXA9jQCdR)](https://codecov.io/gh/muratkeremozcan/tour-of-heroes-react-cypress-ts)
[![Tour of Heroes CCTDD](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/7mypio/main&style=plastic&logo=cypress)](https://dashboard.cypress.io/projects/7mypio/runs)
[![unit-lint-typecheck-e2e-ct](https://github.com/muratkeremozcan/tour-of-heroes-react-cypress-ts/actions/workflows/main.yml/badge.svg)](https://github.com/muratkeremozcan/tour-of-heroes-react-cypress-ts/actions/workflows/main.yml)

![react version](https://img.shields.io/badge/react-18.2.0-brightgreen)
![react-scripts version](https://img.shields.io/badge/react--scripts-5.0.1-brightgreen)
![cypress version](https://img.shields.io/badge/cypress-12.0.1-brightgreen)
![typescript version](https://img.shields.io/badge/typescript-4.8.3-brightgreen)
![jest version](https://img.shields.io/badge/jest-27.5.1-brightgreen)
![eslint version](https://img.shields.io/badge/eslint-8.29.0-brightgreen)
![prettier version](https://img.shields.io/badge/prettier-2.8.1-brightgreen)
[![renovate-app badge][renovate-badge]][renovate-app]

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/

The application built in the book
[CCTDD: Cypress Component Test Driven Development](https://github.com/muratkeremozcan/cctdd).

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
