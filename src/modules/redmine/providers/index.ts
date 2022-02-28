import { container } from 'tsyringe';
import ApiRedmineProvider from './ApiRedmineProvider/implementations/ApiRedmineProvider';
import { IApiRedmineProvider } from './ApiRedmineProvider/models/IApiRedmineProvider';

container.registerSingleton<IApiRedmineProvider>(
  'ApiRedmineProvider',
  ApiRedmineProvider,
);
