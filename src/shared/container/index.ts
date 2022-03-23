import { IRedmineRepository } from '@modules/redmine/domain/repositories/IRedmineRepository';
import { IRedmineUserImportRepository } from '@modules/redmine/domain/repositories/IRedmineUserImportRepository';
import { RedmineRepository } from '@modules/redmine/infra/prisma/repositories/RedmineRepository';
import { RedmineUserImportRepository } from '@modules/redmine/infra/prisma/repositories/RedmineUserImportRepository';
import '@modules/apiRedmine/providers';
import { ITeamActivityRepository } from '@modules/team/domain/repositories/ITeamActivityRepository';
import { ITeamRepository } from '@modules/team/domain/repositories/ITeamRepository';
import { ITeamTaskCategoryRepository } from '@modules/team/domain/repositories/ITeamTaskCategoryRepository';
import { TeamActivityRepository } from '@modules/team/infra/prisma/repositories/TeamActivityRepository';
import { TeamRepository } from '@modules/team/infra/prisma/repositories/TeamRepository';
import { TeamTaskCategoryRepository } from '@modules/team/infra/prisma/repositories/TeamTaskCategoryRepository';
import { UserRepository } from '@modules/user/infra/prisma/repositories/UserRepository';
import { UserTokenRepository } from '@modules/user/infra/prisma/repositories/UserTokenRepository';
import '@modules/user/providers';
import { container } from 'tsyringe';
import { IUserRepository } from './../../modules/user/domain/repositories/IUserRepository';
import { IUserTokenRepository } from './../../modules/user/domain/repositories/IUserTokenRepository';

container.registerSingleton<IRedmineRepository>(
  'RedmineRepository',
  RedmineRepository,
);
container.registerSingleton<IRedmineUserImportRepository>(
  'RedmineUserImportRepository',
  RedmineUserImportRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);

container.registerSingleton<ITeamRepository>('TeamRepository', TeamRepository);
container.registerSingleton<ITeamActivityRepository>(
  'TeamActivityRepository',
  TeamActivityRepository,
);
container.registerSingleton<ITeamTaskCategoryRepository>(
  'TeamTaskCategoryRepository',
  TeamTaskCategoryRepository,
);
