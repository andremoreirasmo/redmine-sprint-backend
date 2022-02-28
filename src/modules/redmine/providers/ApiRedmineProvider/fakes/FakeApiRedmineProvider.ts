import { IApiProjetcRedmine } from '../models/IApiProjetcRedmine';
import { IApiRedmineProvider } from '../models/IApiRedmineProvider';

class FakeApiRedmineProvider implements IApiRedmineProvider {
  public async getProjects(
    url: string,
    apiKey: string,
  ): Promise<IApiProjetcRedmine[]> {
    return [];
  }
}

export default FakeApiRedmineProvider;
