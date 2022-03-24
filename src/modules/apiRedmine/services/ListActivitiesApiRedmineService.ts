import { inject, injectable } from 'tsyringe';
import { IApiProjetcRedmine } from '../domain/models/IApiProjetcRedmine';
import { IApiRedmineGetActivitiesProvider } from '../domain/providers/IApiRedmineGetActivitiesProvider';

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
    const activities = await this.apiRedmineGetActivitiesProvider.get(
      url,
      apiKey,
    );

    return activities.filter(activity => activity.active);
  }
}

export default ListActivitiesApiRedmineService;
