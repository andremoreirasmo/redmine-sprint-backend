import { IApiCategoryRedmine } from '@modules/apiRedmine/domain/models/IApiCategoryRedmine';
import { IApiRedmineGetCategoriesProvider } from '@modules/apiRedmine/domain/providers/IApiRedmineGetCategoriesProvider';
import AppError from '@shared/errors/AppError';
import axios, { AxiosError } from 'axios';

interface IResponseApi {
  issue_categories: IApiCategoryRedmine[];
}

class ApiRedmineGetCategoriesProvider
  implements IApiRedmineGetCategoriesProvider
{
  public async get(
    url: string,
    apiKey: string,
    project: number,
  ): Promise<IApiCategoryRedmine[]> {
    const api = axios.create({
      baseURL: url,
    });

    try {
      const response = await api.get<IResponseApi>(
        `/projects/${project}/issue_categories.json`,
        {
          params: { key: apiKey },
        },
      );

      return response.data.issue_categories;
    } catch (error) {
      const e = error as AxiosError;

      switch (e.response?.status) {
        case 401:
          throw new AppError('Acesso não autorizado');
          break;

        case 500:
          throw new AppError('Erro interno da api do Redmine');
          break;

        case 403:
          return [];
          break;

        default:
          throw new AppError('Não foi possível se conectar na api do Redmine');
          break;
      }
    }
  }
}

export default ApiRedmineGetCategoriesProvider;
