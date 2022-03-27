import { container } from 'tsyringe';
import { IApiRedmineGetActivitiesProvider } from '../domain/providers/IApiRedmineGetActivitiesProvider';
import { IApiRedmineGetCategoriesProvider } from '../domain/providers/IApiRedmineGetCategoriesProvider';
import { IApiRedmineGetProjectsProvider } from '../domain/providers/IApiRedmineGetProjectsProvider';
import { IApiRedmineGetUsersProvider } from '../domain/providers/IApiRedmineGetUsersProvider';
import ApiRedmineGetActivitiesProvider from './ApiRedmineProvider/implementations/ApiRedmineGetActivitiesProvider';
import ApiRedmineGetCategoriesProvider from './ApiRedmineProvider/implementations/ApiRedmineGetCategoriesProvider';
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

container.registerSingleton<IApiRedmineGetCategoriesProvider>(
  'ApiRedmineGetCategoriesProvider',
  ApiRedmineGetCategoriesProvider,
);
