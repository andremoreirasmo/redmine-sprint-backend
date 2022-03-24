import { IApiRedmineActvity } from "./IApiRedmineActvity";

export interface IApiRedmineGetActivitiesProvider {
   get(url: string, apiKey: string): Promise<IApiRedmineActvity[]> {
}
