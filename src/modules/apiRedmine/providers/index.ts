import { container } from 'tsyringe';
import { IApiRedmineGetProjectsProvider } from '../domain/models/IApiRedmineGetProjectsProvider';
import { IApiRedmineGetUsersProvider } from '../domain/models/IApiRedmineGetUsersProvider';
import ApiRedmineGetProjectsProvider from './ApiRedmineProvider/implementations/ApiRedmineGetProjectsProvider';
import ApiRedmineGetUsersProvider from './ApiRedmineProvider/implementations/ApiRedmineGetUsersProvider';

container.registerSingleton<IApiRedmineGetProjectsProvider>(
  'ApiRedmineGetProjectsProvider',
  ApiRedmineGetProjectsProvider,
);

container.registerSingleton<IApiRedmineGetUsersProvider>(
  'ApiRedmineGetUsersProvider',
  ApiRedmineGetUsersProvider,
);
