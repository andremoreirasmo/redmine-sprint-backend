import { container } from 'tsyringe';
import ApiRedmineGetProjectsProvider from './ApiRedmineProvider/implementations/ApiRedmineGetProjectsProvider';
import ApiRedmineGetUsersProvider from './ApiRedmineProvider/implementations/ApiRedmineGetUsersProvider';
import { IApiRedmineGetProjectsProvider } from './ApiRedmineProvider/models/IApiRedmineGetProjectsProvider';
import { IApiRedmineGetUsersProvider } from './ApiRedmineProvider/models/IApiRedmineGetUsersProvider';

container.registerSingleton<IApiRedmineGetProjectsProvider>(
  'ApiRedmineGetProjectsProvider',
  ApiRedmineGetProjectsProvider,
);

container.registerSingleton<IApiRedmineGetUsersProvider>(
  'ApiRedmineGetUsersProvider',
  ApiRedmineGetUsersProvider,
);
