import { IApiRedmineActvity } from '../models/IApiRedmineActvity';

export interface IApiRedmineGetActivitiesProvider {
  get(url: string, apiKey: string): Promise<IApiRedmineActvity[]>;
}
