import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default function errorsHandler(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      messages: error.message,
    });
  }

  console.log(error);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
