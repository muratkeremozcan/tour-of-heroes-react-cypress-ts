import '@cypress/instrument-cra'
import {defineConfig} from 'cypress'
import plugins from './cypress/support/plugins'
import tasks from './cypress/support/tasks'
import esbuildPreprocessor from './cypress/support/esbuild-preprocessor'

export default defineConfig({
  projectId: '7mypio',
  // @ts-expect-error - experimentalSingleTabRunMode is not in the type definition
  experimentalSingleTabRunMode: true,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  env: {
    API_URL: 'http://localhost:4000/api',
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      esbuildPreprocessor(on) // no need with vite
      tasks(on)
      return plugins(on, config)
    },
  },

  component: {
    setupNodeEvents(on, config) {
      tasks(on)
      return plugins(on, config)
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
