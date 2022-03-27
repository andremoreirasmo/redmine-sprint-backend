import { IApiCategoryRedmine } from '../models/IApiCategoryRedmine';

export interface IApiRedmineGetCategoriesProvider {
  get(
    url: string,
    apiKey: string,
    project: number,
  ): Promise<IApiCategoryRedmine[]>;
}
