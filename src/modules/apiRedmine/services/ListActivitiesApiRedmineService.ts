import { inject, injectable } from 'tsyringe';
import { IApiProjetcRedmine } from '../domain/models/IApiProjetcRedmine';
import { IApiRedmineGetActivitiesProvider } from '../domain/models/IApiRedmineGetActivitiesProvider';
import { IApiRedmineGetProjectsProvider } from '../domain/models/IApiRedmineGetProjectsProvider';

interface IRequest {
  url: string;
  apiKey: string;
}

@injectable()
class ListActivitiesApiRedmineService {
  constructor(
    @inject('ApiRedmineGetActivitiesProvider')
    private apiRedmineGetActivitiesProvider: IApiRedmineGetActivitiesProvider,
  ) {}

  public async execute({
    url,
    apiKey,
  }: IRequest): Promise<IApiProjetcRedmine[]> {
    const projects = await this.apiRedmineGetActivitiesProvider.get(
      url,
      apiKey,
    );

    return projects.filter(activity => activity.active);
  }
}

export default ListActivitiesApiRedmineService;
