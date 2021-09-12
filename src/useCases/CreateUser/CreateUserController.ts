import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createuserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      const user = await this.createuserUseCase.execute({
        name,
        email,
        password,
      });

      return response.status(201).json({user});
    } catch (err) {
      next(err);
    }
  }
}
