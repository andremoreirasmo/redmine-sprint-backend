import UserToken from '@modules/user/domain/entities/UserToken';
import { IUserToken } from '@modules/user/domain/models/IUserToken';
import { IUserTokenRepository } from '@modules/user/domain/repositories/IUserTokenRepository';
import { recordToEntity } from '@shared/entitites/RecordToEntity';
import { prismaClient } from '@shared/infra/prisma/prismaClient';

export class UserTokenRepository implements IUserTokenRepository {
  public async findByToken(token: string): Promise<IUserToken | null> {
    const userToken = await prismaClient.user_token.findFirst({
      where: { token },
    });

    return recordToEntity(UserToken, userToken);
  }

  public async generate(user_id: string): Promise<IUserToken> {
    const userToken = await prismaClient.user_token.create({
      data: { user_id },
    });

    return recordToEntity(UserToken, userToken);
  }
}
