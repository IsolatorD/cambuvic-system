'use strict'

// eslint-disable-next-line import/no-extraneous-dependencies
const { LogicalException } = require('@adonisjs/generic-exceptions')

class ForbiddenException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = ForbiddenException
