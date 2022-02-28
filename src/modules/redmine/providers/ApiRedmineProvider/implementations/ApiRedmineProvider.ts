import AppError from '@shared/errors/AppError';
import axios, { AxiosError } from 'axios';
import { IApiProjetcRedmine } from '../models/IApiProjetcRedmine';
import { IApiRedmineProvider } from '../models/IApiRedmineProvider';

interface IResponseApi {
  projects: IApiProjetcRedmine[];
}

class ApiRedmineProvider implements IApiRedmineProvider {
  public async getProjects(
    url: string,
    apiKey: string,
  ): Promise<IApiProjetcRedmine[]> {
    const api = axios.create({
      baseURL: url,
    });

    const response = await api
      .get<IResponseApi>('/projects.json', {
        params: { key: apiKey, include: 'memberships' },
      })
      .catch((e: AxiosError) => {
        switch (e.response?.status) {
          case 401:
            throw new AppError('Acesso não autorizado');
            break;

          default:
            throw new AppError(
              'Não foi possível se conectar na api do Redmine',
            );
            break;
        }
      });

    return response.data.projects;
  }
}

export default ApiRedmineProvider;
