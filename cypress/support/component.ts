import './commands'
import '@testing-library/cypress/add-commands'

import {mount} from 'cypress/react18'

Cypress.Commands.add('mount', mount)
