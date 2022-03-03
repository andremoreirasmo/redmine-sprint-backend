import { IApiUserRedmine } from './IApiUserRedmine';

export interface IApiRedmineGetUsersProvider {
  get(
    url: string,
    apiKey: string,
    idProject: number,
  ): Promise<IApiUserRedmine[]>;
}
