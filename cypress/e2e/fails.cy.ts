import {faker} from '@faker-js/faker/locale/en'
import jwt from 'jsonwebtoken'
import {v4 as uuid} from 'uuid'

export const generateAccessToken = (overrides = {}): string => {
  const defaults = {
    user: {
      email: faker.internet.exampleEmail(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      accountId: uuid(),
      scope: '',
    },
    secret: 'TEST',
    expiresIn: '3m', // sets default token expiry to 3 minutes, which should be enough for most tests.
    sub: '',
  }
  const {user, secret, expiresIn, sub} = Cypress._.merge(defaults, overrides)
  return jwt.sign(
    {
      ...user,
      jti: '',
    },
    secret,
    {
      expiresIn,
      subject: sub,
    },
  )
}

it('should work', () => {
  const token = generateAccessToken()
  cy.log(token)
})
