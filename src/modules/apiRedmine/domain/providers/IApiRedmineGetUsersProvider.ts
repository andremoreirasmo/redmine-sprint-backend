import { IApiUserRedmine } from '../models/IApiUserRedmine';

export interface IApiRedmineGetUsersProvider {
  get(
    url: string,
    apiKey: string,
    idProject: number,
  ): Promise<IApiUserRedmine[]>;
}
