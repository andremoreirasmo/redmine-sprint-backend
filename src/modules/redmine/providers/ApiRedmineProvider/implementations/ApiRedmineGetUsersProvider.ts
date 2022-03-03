import { IApiRedmineGetUsersProvider } from '../models/IApiRedmineGetUsersProvider';
import { IApiUserRedmine } from '../models/IApiUserRedmine';
import { IMemberships } from './models/GetUsersProviderModels';
import FetchDataUsers from './services/FetchDataUsers';

class ApiRedmineGetUsersProvider implements IApiRedmineGetUsersProvider {
  public async get(
    url: string,
    apiKey: string,
    idProject: number,
  ): Promise<IApiUserRedmine[]> {
    const fetchDataUsers = new FetchDataUsers(url, apiKey, idProject);

    const memberships: IMemberships[] = [];
    let offset = -1;
    let totalCountMembers = 0;
    do {
      offset++;

      const response = await fetchDataUsers.fetch(offset);

      totalCountMembers = response.total_count;
      memberships.push(...response.memberships);
    } while (memberships.length < totalCountMembers);

    const users = memberships
      .filter(member => member.user)
      .map(member => {
        return { ...member.user } as IApiUserRedmine;
      });

    const mapUsers = new Map(users.map(user => [user.id, user]));

    return Array.from(mapUsers.values());
  }
}

export default ApiRedmineGetUsersProvider;
