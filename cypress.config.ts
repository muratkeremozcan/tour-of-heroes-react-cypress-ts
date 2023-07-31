import '@cypress/instrument-cra'
import {defineConfig} from 'cypress'
import plugins from './cypress/support/plugins'
import tasks from './cypress/support/tasks'
import esbuildPreprocessor from './cypress/support/esbuild-preprocessor'
import path from 'path'

export default defineConfig({
  projectId: 'fnmwvn',
  // @ts-expect-error - experimentalSingleTabRunMode is not in the type definition
  experimentalSingleTabRunMode: true,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  env: {
    API_URL: 'http://localhost:4000/api',
    coverage: {
      quiet: true,
    },
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      esbuildPreprocessor(on)
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
      framework: 'create-react-app',
      bundler: 'webpack',
      // here are the additional settings from Gleb's instructions
      webpackConfig: {
        resolve: {
          alias: {
            '@cypress': path.resolve(__dirname, 'cypress'),
            '@support': path.resolve(__dirname, 'cypress', 'support'),
            '@fixtures': path.resolve(__dirname, 'cypress', 'fixtures'),
          },
        },
        // workaround to react-scripts 5 issue https://github.com/cypress-io/cypress/issues/22762
        devServer: {
          port: 3001,
        },
        mode: 'development',
        devtool: false,
        module: {
          rules: [
            // application and Cypress files are bundled like React components
            // and instrumented using the babel-plugin-istanbul
            {
              test: /\.ts$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                    '@babel/preset-typescript',
                  ],
                  plugins: [
                    'istanbul',
                    ['@babel/plugin-transform-modules-commonjs', {loose: true}],
                  ],
                },
              },
            },
          ],
        },
      },
    },
  },
})
