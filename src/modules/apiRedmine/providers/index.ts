import { container } from 'tsyringe';
import { IApiRedmineGetActivitiesProvider } from '../domain/models/IApiRedmineGetActivitiesProvider';
import { IApiRedmineGetProjectsProvider } from '../domain/models/IApiRedmineGetProjectsProvider';
import { IApiRedmineGetUsersProvider } from '../domain/models/IApiRedmineGetUsersProvider';
import ApiRedmineGetActivitiesProvider from './ApiRedmineProvider/implementations/ApiRedmineGetActivitiesProvider';
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

container.registerSingleton<IApiRedmineGetActivitiesProvider>(
  'ApiRedmineGetActivitiesProvider',
  ApiRedmineGetActivitiesProvider,
);
