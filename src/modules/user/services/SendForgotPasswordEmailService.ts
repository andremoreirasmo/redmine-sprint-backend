import MailServer from '@config/mail/MailServer';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await MailServer.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Redmine Sprint] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          token,
          link: `http://localhost:3000/reset_password?token=${token}`, //ToDo: Mudar link para frontend
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
