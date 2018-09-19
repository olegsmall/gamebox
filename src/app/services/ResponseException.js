function ResponseException(code = 0, message = '') {
  this.message = message;
  this.code = code;
}

export default ResponseException;
