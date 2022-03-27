import { inject, injectable } from 'tsyringe';
import { IApiRedmineActvity } from '../domain/models/IApiRedmineActvity';
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
  }: IRequest): Promise<IApiRedmineActvity[]> {
    const activities = await this.apiRedmineGetActivitiesProvider.get(
      url,
      apiKey,
    );

    return activities.filter(activity => activity.active);
  }
}

export default ListActivitiesApiRedmineService;
