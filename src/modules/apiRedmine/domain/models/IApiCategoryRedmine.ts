export interface IApiCategoryRedmine {
  id: number;
  name: string;
  project: {
    id: number;
    name: string;
  };
}
