import { IApiProjetcRedmine } from './IApiProjetcRedmine';

export interface IApiRedmineProvider {
  getProjects(url: string, apiKey: string): Promise<IApiProjetcRedmine[]>;
}
