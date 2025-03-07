import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): void {
      // implement node event listeners here
      // No need to return config when return type is void
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
    specPattern: '', // Effectively disables component testing
  },
  video: false,
})
