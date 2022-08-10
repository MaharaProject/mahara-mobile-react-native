import { RequestErrorPayload } from '../models/models';

class RequestError extends Error {
  code: number;

  name = 'RequestError';

  previousError: Error | null = null;

  constructor({ code = 400, message = 'Request Error', previousError }: RequestErrorPayload) {
    super(String(message) || 'Request Error');
    this.code = Number(code);
    if (previousError) {
      this.previousError = previousError;
    }
  }

  static createRequestError(e: RequestError): RequestError {
    if (e.name === 'RequestError') {
      return e;
    }

    return new RequestError({
      code: 500,
      message: e.message,
      previousError: e
    });
  }
}

export default RequestError;
