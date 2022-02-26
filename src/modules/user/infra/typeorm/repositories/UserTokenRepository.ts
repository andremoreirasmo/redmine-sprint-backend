import { IUserTokenRepository } from '@modules/user/domain/repositories/IUserTokenRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
