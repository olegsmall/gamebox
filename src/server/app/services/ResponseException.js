/**
 * Created by: Oleg Smolovik
 * Created: 15 Sept 2018
 *
 * @fileoverview Defines new exception type.
 */

function ResponseException(code = 0, message = '') {
  this.message = message;
  this.code = code;
}

export default ResponseException;
