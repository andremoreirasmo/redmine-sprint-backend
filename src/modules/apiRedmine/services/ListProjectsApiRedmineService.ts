import { inject, injectable } from 'tsyringe';
import { IApiProjetcRedmine } from '../domain/models/IApiProjetcRedmine';
import { IApiRedmineGetProjectsProvider } from '../domain/providers/IApiRedmineGetProjectsProvider';

interface IRequest {
  url: string;
  apiKey: string;
}

@injectable()
class ListProjectsApiRedmineService {
  constructor(
    @inject('ApiRedmineGetProjectsProvider')
    private apiRedmineGetProjectsProvider: IApiRedmineGetProjectsProvider,
  ) {}

  public async execute({
    url,
    apiKey,
  }: IRequest): Promise<IApiProjetcRedmine[]> {
    const projects = await this.apiRedmineGetProjectsProvider.get(url, apiKey);

    return projects;
  }
}

export default ListProjectsApiRedmineService;
