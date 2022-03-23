import { IApiProjetcRedmine } from './IApiProjetcRedmine';

export interface IApiRedmineGetProjectsProvider {
  get(url: string, apiKey: string): Promise<IApiProjetcRedmine[]>;
}
