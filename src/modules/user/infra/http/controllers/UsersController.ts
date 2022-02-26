import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUserService);

    const users = await listUsers.execute();

    return response.json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return response.json(classToClass(user));
  }
}
