import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParserMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

class HandlebarsMailTemplate {
  public async parse({
    file,
    variables,
  }: IParserMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export { IParserMailTemplate, HandlebarsMailTemplate };
