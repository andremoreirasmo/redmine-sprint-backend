import { CelebrateError, isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

export default function celebrateErrorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  if (!isCelebrateError(error)) {
    next(error);
  }

  const errorCelebrate = error as CelebrateError;
  const messages = [];

  for (const [segment, joiError] of errorCelebrate.details.entries()) {
    messages.push(
      joiError.details.map(err => {
        return err.message + ' in segment ' + segment;
      }),
    );
  }

  return response.status(422).json({
    status: 'error',
    messages: messages,
  });
}
