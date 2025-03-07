// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react' // Use this instead of cypress/react18

// Augment the Cypress namespace to include the mount command
// @ts-ignore
Cypress.Chainable.prototype.mount = mount;

// Add any global component configuration
// @ts-ignore
Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)
