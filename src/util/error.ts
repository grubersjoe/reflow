abstract class BaseError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotImplementedError extends BaseError {}
export class UnexpectedError extends BaseError {}
