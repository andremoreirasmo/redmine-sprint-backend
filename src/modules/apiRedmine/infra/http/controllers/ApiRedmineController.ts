import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProjectsApiRedmineService from '@modules/apiRedmine/services/ListProjectsApiRedmineService';
import ListActivitiesApiRedmineService from '@modules/apiRedmine/services/ListActivitiesApiRedmineService';
import ShowRedmineService from '@modules/redmine/services/ShowRedmineService';
import ListCategoriesApiRedmineService from '@modules/apiRedmine/services/ListCategoriesApiRedmineService';
import ListUsersRedmineService from '@modules/apiRedmine/services/ListUsersRedmineService';

export default class ApiRedmineController {
  public async getProjects(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { url_redmine, api_key_redmine } = request.query;
    const listProjectsApiRedmine = container.resolve(
      ListProjectsApiRedmineService,
    );

    const projects = await listProjectsApiRedmine.execute({
      url: url_redmine as string,
      apiKey: api_key_redmine as string,
    });

    return response.json(projects);
  }

  public async getActvities(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { redmine_id } = request.query;

    const listActivitiesApiRedmine = container.resolve(
      ListActivitiesApiRedmineService,
    );

    const showRedmine = container.resolve(ShowRedmineService);

    const redmine = await showRedmine.execute({
      user_id,
      id: redmine_id as string,
    });

    const acvities = await listActivitiesApiRedmine.execute({
      url: redmine.url,
      apiKey: redmine.apiKey,
    });

    return response.json(acvities);
  }

  public async getCategories(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { redmine_id } = request.query;

    const showRedmine = container.resolve(ShowRedmineService);
    const listProjects = container.resolve(ListProjectsApiRedmineService);
    const listCategories = container.resolve(ListCategoriesApiRedmineService);

    const redmine = await showRedmine.execute({
      user_id,
      id: redmine_id as string,
    });

    const projects = await listProjects.execute({
      url: redmine.url,
      apiKey: redmine.apiKey,
    });

    const categories = await listCategories.execute({
      url: redmine.url,
      apiKey: redmine.apiKey,
      projects: projects.map(e => e.id),
    });

    return response.json(categories);
  }

  public async getUsers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { redmine_id } = request.query;

    const showRedmine = container.resolve(ShowRedmineService);
    const listUsers = container.resolve(ListUsersRedmineService);

    const redmine = await showRedmine.execute({
      user_id,
      id: redmine_id as string,
    });

    const users = await listUsers.execute({
      redmine_id: redmine.id,
    });

    return response.json(users);
  }
}
