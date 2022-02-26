import { container } from 'tsyringe';

import { IRedmineRepository } from '@modules/redmine/domain/repositories/IRedmineRepository';
import { RedmineRepository } from '@modules/redmine/infra/typeorm/repositories/RedmineRepository';

import { IUserRepository } from './../../modules/user/domain/repositories/IUserRepository';
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
import { IUserTokenRepository } from './../../modules/user/domain/repositories/IUserTokenRepository';
import { UserTokenRepository } from '@modules/user/infra/typeorm/repositories/UserTokenRepository';

container.registerSingleton<IRedmineRepository>(
  'RedmineRepository',
  RedmineRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
