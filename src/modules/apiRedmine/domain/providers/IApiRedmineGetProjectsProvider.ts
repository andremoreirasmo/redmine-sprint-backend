import { IApiProjetcRedmine } from '../models/IApiProjetcRedmine';

export interface IApiRedmineGetProjectsProvider {
  get(url: string, apiKey: string): Promise<IApiProjetcRedmine[]>;
}
