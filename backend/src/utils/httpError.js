export class HttpError extends Error {
  constructor(statusCode, message, extra = {}) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.extra = extra;
  }
}
