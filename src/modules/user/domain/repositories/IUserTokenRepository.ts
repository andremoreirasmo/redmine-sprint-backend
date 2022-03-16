import { IUserToken } from '../models/IUserToken';

export interface IUserTokenRepository {
  findByToken(token: string): Promise<IUserToken | null>;
  generate(user_id: string): Promise<IUserToken>;
}
