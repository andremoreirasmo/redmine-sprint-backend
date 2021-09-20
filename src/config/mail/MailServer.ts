import nodemailer from 'nodemailer';
import {
  IParserMailTemplate,
  HandlebarsMailTemplate,
} from './HandlebarsMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  subject: string;
  to: IMailContact;
  from?: IMailContact;
  templateData: IParserMailTemplate;
}

export default class MailServer {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT as string),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const handlebarsMailTemplate = new HandlebarsMailTemplate();
    await transport.sendMail({
      from: {
        name: from?.name || 'Redmine Sprint',
        address: from?.email || 'equipe@redminesprint.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await handlebarsMailTemplate.parse(templateData),
    });
  }
}
