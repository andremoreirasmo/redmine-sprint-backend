import { IApiRedmineActvity } from '@modules/apiRedmine/domain/models/IApiRedmineActvity';
import { IApiRedmineGetActivitiesProvider } from '@modules/apiRedmine/domain/providers/IApiRedmineGetActivitiesProvider';
import AppError from '@shared/errors/AppError';
import axios, { AxiosError } from 'axios';

interface IResponseApi {
  time_entry_activities: IApiRedmineActvity[];
}

class ApiRedmineGetActivitiesProvider
  implements IApiRedmineGetActivitiesProvider
{
  public async get(url: string, apiKey: string): Promise<IApiRedmineActvity[]> {
    const api = axios.create({
      baseURL: url,
    });

    const response = await api
      .get<IResponseApi>('/enumerations/time_entry_activities.json', {
        params: { key: apiKey },
      })
      .catch((e: AxiosError) => {
        switch (e.response?.status) {
          case 401:
            throw new AppError('Acesso não autorizado');
            break;

          case 500:
            throw new AppError('Erro interno da api do Redmine');
            break;

          default:
            throw new AppError(
              'Não foi possível se conectar na api do Redmine',
            );
            break;
        }
      });

    return response.data.time_entry_activities;
  }
}

export default ApiRedmineGetActivitiesProvider;
