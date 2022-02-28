import { inject, injectable } from 'tsyringe';
import { IApiProjetcRedmine } from '../providers/ApiRedmineProvider/models/IApiProjetcRedmine';
import { IApiRedmineProvider } from '../providers/ApiRedmineProvider/models/IApiRedmineProvider';

interface IRequest {
  url: string;
  apiKey: string;
}

@injectable()
class ListProjectsApiRedmineService {
  constructor(
    @inject('ApiRedmineProvider')
    private apiRedmineProvider: IApiRedmineProvider,
  ) {}

  public async execute({
    url,
    apiKey,
  }: IRequest): Promise<IApiProjetcRedmine[]> {
    const projects = await this.apiRedmineProvider.getProjects(url, apiKey);

    return projects;
  }
}

export default ListProjectsApiRedmineService;
