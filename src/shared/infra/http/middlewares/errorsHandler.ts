import AppError from '@shared/errors/AppError';
import { CelebrateError, isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

export default function errorsHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      messages: error.message,
    });
  }

  if (isCelebrateError(error)) {
    const errorCelebrate = error as CelebrateError;
    const messages = [];

    for (const [segment, joiError] of errorCelebrate.details.entries()) {
      messages.push(
        joiError.details.map(err => {
          console.log(err.context);

          return err.message + ' in segment ' + segment;
        }),
      );
    }

    return response.status(422).json({
      status: 'error',
      messages: messages,
    });
  }

  console.log(error);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
