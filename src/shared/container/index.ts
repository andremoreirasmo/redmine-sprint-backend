import { IRedmineRepository } from '@modules/redmine/domain/repositories/IRedmineRepository';
import { IRedmineUserImportRepository } from '@modules/redmine/domain/repositories/IRedmineUserImportRepository';
import { RedmineRepository } from '@modules/redmine/infra/typeorm/repositories/RedmineRepository';
import { RedmineUserImportRepository } from '@modules/redmine/infra/typeorm/repositories/RedmineUserImportRepository';
import '@modules/redmine/providers';
import { ITeamActivityRedmineRepository } from '@modules/team/domain/repositories/ITeamActivityRedmineRepository';
import { ITeamActivityRepository } from '@modules/team/domain/repositories/ITeamActivityRepository';
import { ITeamRepository } from '@modules/team/domain/repositories/ITeamRepository';
import { ITeamTaskCategoryRedmineRepository } from '@modules/team/domain/repositories/ITeamTaskCategoryRedmineRepository';
import { ITeamTaskCategoryRepository } from '@modules/team/domain/repositories/ITeamTaskCategoryRepository';
import { TeamActivityRedmineRepository } from '@modules/team/infra/typeorm/repositories/TeamActivityRedmineRepository';
import { TeamActivityRepository } from '@modules/team/infra/typeorm/repositories/TeamActivityRepository';
import { TeamRepository } from '@modules/team/infra/typeorm/repositories/TeamRepository';
import { TeamTaskCategoryRedmineRepository } from '@modules/team/infra/typeorm/repositories/TeamTaskCategoryRedmineRepository';
import { TeamTaskCategoryRepository } from '@modules/team/infra/typeorm/repositories/TeamTaskCategoryRepository';
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
import { UserTokenRepository } from '@modules/user/infra/typeorm/repositories/UserTokenRepository';
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
container.registerSingleton<ITeamActivityRedmineRepository>(
  'TeamActivityRedmineRepository',
  TeamActivityRedmineRepository,
);
container.registerSingleton<ITeamTaskCategoryRepository>(
  'TeamTaskCategoryRepository',
  TeamTaskCategoryRepository,
);
container.registerSingleton<ITeamTaskCategoryRedmineRepository>(
  'TeamTaskCategoryRedmineRepository',
  TeamTaskCategoryRedmineRepository,
);
