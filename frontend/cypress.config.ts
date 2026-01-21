import { defineConfig } from 'cypress';

const webpack = require('@cypress/webpack-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');

async function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    webpack({
      webpackOptions: {
        resolve: {
          extensions: ['.ts', '.js'],
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true,
                  },
                },
              ],
            },
            {
              test: /\.feature$/,
              use: [
                {
                  loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                  options: config,
                },
              ],
            },
          ],
        },
      },
    }),
  );

  return config;
}

export default defineConfig({
  e2e: {
    testIsolation: false,
    baseUrl: 'http://localhost:4200',
    specPattern: ['**/e2e/**/*.feature'],
    excludeSpecPattern: '*.js',
    env: {
      USER_EMAIL: process.env.ADMIN_EMAIL || 'admin@teste.com',
      USER_PASSWORD: process.env.ADMIN_PASSWORD || '1234',
    },
    setupNodeEvents,
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
