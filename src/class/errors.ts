interface IBaseCustomError {
  statusCode: number;
}

export class BaseCustomError extends Error implements IBaseCustomError {
  declare public statusCode: number;

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
      cause: this.cause,
    };
  }
}

export class BadRequestError extends BaseCustomError {
  constructor(message: string = "Bad request", options?: { cause: unknown }) {
    super(message, { cause: options?.cause });
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

export class UnauthorizedError extends BaseCustomError {
  constructor(message: string = "You don't have permission", options?: { cause: unknown }) {
    super(message, { cause: options?.cause });
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

export class ForbiddenError extends BaseCustomError {
  constructor(message: string = "Permission denied", options?: { cause: unknown }) {
    super(message, { cause: options?.cause });
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}

export class NotFoundError extends BaseCustomError {
  constructor(message: string = "Not found", options?: { cause: unknown }) {
    super(message, { cause: options?.cause });
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class NotAllowedError extends BaseCustomError {
  constructor(message: string = "Not allowed", options?: { cause: unknown }) {
    super(message, { cause: options?.cause });
    this.name = "NotAllowedError";
    this.statusCode = 405;
  }
}

export class ConflictError extends BaseCustomError {
  constructor(message: string = "Conflict", options?: { cause: unknown }) {
    super(message, { cause: options?.cause });
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

export class InternalServerError extends BaseCustomError {
  constructor({ cause, message }: { cause: unknown; message?: string }) {
    super(message ?? "An internal unexpected error happened.", { cause });
    this.name = "InternalServerError";
    this.statusCode = cause instanceof BaseCustomError ? cause.statusCode : 500;
  }
}

export class NotImplementedError extends BaseCustomError {
  constructor(options?: { cause?: unknown }) {
    super("An internal unexpected error happened when trying to execute a not implemented functionality.", options);
    this.name = "NotImplementedError";
    this.statusCode = 501;
  }
}

export class ServiceUnavailableError extends BaseCustomError {
  constructor(message?: string, options?: { cause: unknown }) {
    super("The service you are trying to reach is unavailable.", options);
    this.name = "ServiceUnavailableError";
    this.statusCode = 503;
  }
}
