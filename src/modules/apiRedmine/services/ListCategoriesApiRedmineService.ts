import { inject, injectable } from 'tsyringe';
import { IApiCategoryRedmine } from '../domain/models/IApiCategoryRedmine';
import { IApiRedmineGetCategoriesProvider } from '../domain/providers/IApiRedmineGetCategoriesProvider';

interface IRequest {
  url: string;
  apiKey: string;
  projects: number[];
}

@injectable()
class ListCategoriesApiRedmineService {
  constructor(
    @inject('ApiRedmineGetCategoriesProvider')
    private apiRedmineGetCategoriesProvider: IApiRedmineGetCategoriesProvider,
  ) {}

  public async execute({
    url,
    apiKey,
    projects,
  }: IRequest): Promise<IApiCategoryRedmine[]> {
    const categoriesByProject = await Promise.all(
      projects.map(project =>
        this.apiRedmineGetCategoriesProvider.get(url, apiKey, project),
      ),
    );

    return categoriesByProject.flatMap(category => category);
  }
}

export default ListCategoriesApiRedmineService;
