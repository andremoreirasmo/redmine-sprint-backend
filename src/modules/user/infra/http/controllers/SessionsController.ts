import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateSessionsService from '../../../services/CreateSessionsService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password, rememberMe } = request.body;

    const createSessionsService = container.resolve(CreateSessionsService);

    const user = await createSessionsService.execute({
      email,
      password,
      rememberMe,
    });

    return response.json(classToClass(user));
  }
}
