export class ShopierError extends Error {
  public status: number;
  public statusText: string;
  public body: any;

  constructor(status: number, statusText: string, body: any) {
    super(`Shopier API Error: ${status} ${statusText}`);
    this.name = 'ShopierError';
    this.status = status;
    this.statusText = statusText;
    this.body = body;
    Object.setPrototypeOf(this, ShopierError.prototype);
  }
}

export class ShopierBadRequestError extends ShopierError {
  constructor(statusText: string, body: any) {
    super(400, statusText, body);
    this.name = 'ShopierBadRequestError';
    Object.setPrototypeOf(this, ShopierBadRequestError.prototype);
  }
}

export class ShopierUnauthorizedError extends ShopierError {
  constructor(statusText: string, body: any) {
    super(401, statusText, body);
    this.name = 'ShopierUnauthorizedError';
    Object.setPrototypeOf(this, ShopierUnauthorizedError.prototype);
  }
}

export class ShopierPaymentRequiredError extends ShopierError {
  constructor(statusText: string, body: any) {
    super(402, statusText, body);
    this.name = 'ShopierPaymentRequiredError';
    Object.setPrototypeOf(this, ShopierPaymentRequiredError.prototype);
  }
}

export class ShopierForbiddenError extends ShopierError {
  constructor(statusText: string, body: any) {
    super(403, statusText, body);
    this.name = 'ShopierForbiddenError';
    Object.setPrototypeOf(this, ShopierForbiddenError.prototype);
  }
}

export class ShopierNotFoundError extends ShopierError {
  constructor(statusText: string, body: any) {
    super(404, statusText, body);
    this.name = 'ShopierNotFoundError';
    Object.setPrototypeOf(this, ShopierNotFoundError.prototype);
  }
}

export class ShopierRateLimitError extends ShopierError {
  public retryAfter: number;

  constructor(statusText: string, body: any, retryAfter: number) {
    super(429, statusText, body);
    this.name = 'ShopierRateLimitError';
    this.retryAfter = retryAfter;
    Object.setPrototypeOf(this, ShopierRateLimitError.prototype);
  }
}

export class ShopierInternalError extends ShopierError {
  constructor(status: number, statusText: string, body: any) {
    super(status, statusText, body);
    this.name = 'ShopierInternalError';
    Object.setPrototypeOf(this, ShopierInternalError.prototype);
  }
}

export function createShopierError(status: number, statusText: string, body: any, headers?: Headers): ShopierError {
  switch (status) {
    case 400:
      return new ShopierBadRequestError(statusText, body);
    case 401:
      return new ShopierUnauthorizedError(statusText, body);
    case 402:
      return new ShopierPaymentRequiredError(statusText, body);
    case 403:
      return new ShopierForbiddenError(statusText, body);
    case 404:
      return new ShopierNotFoundError(statusText, body);
    case 429: {
      const retryAfterHeader = headers?.get('Retry-After');
      const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : 60;
      return new ShopierRateLimitError(statusText, body, retryAfter);
    }
    default:
      if (status >= 500) {
        return new ShopierInternalError(status, statusText, body);
      }
      return new ShopierError(status, statusText, body);
  }
}
