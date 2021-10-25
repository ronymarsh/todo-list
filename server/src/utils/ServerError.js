class ServerError extends Error {
  constructor(message, httpCode, errorCode) {
    super(message);
    this.message = message;
    this.httpCode = httpCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, ServerError);
  }

  toJSON() {
    return {
      message: this.message,
      httpCode: this.httpCode,
      errorCode: this.errorCode,
    };
  }
}

module.exports = ServerError;
