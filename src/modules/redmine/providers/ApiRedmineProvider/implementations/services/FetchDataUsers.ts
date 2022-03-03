import AppError from '@shared/errors/AppError';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { IResponseApiGetUsersProvider } from '../models/GetUsersProviderModels';

export default class FetchDataUsers {
  private api: AxiosInstance;

  constructor(url: string, private apiKey: string, private idProject: number) {
    this.api = axios.create({
      baseURL: url,
    });
  }

  public async fetch(offset: number): Promise<IResponseApiGetUsersProvider> {
    const response = await this.api
      .get<IResponseApiGetUsersProvider>(
        `projects/${this.idProject}/memberships.json`,
        {
          params: { key: this.apiKey, limit: 100, offset },
        },
      )
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

    return response.data;
  }
}
