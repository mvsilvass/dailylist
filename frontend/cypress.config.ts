import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

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
      USER_EMAIL: process.env.ADMIN_EMAIL,
      USER_PASSWORD: process.env.ADMIN_PASSWORD,
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
