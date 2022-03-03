import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateRedmineService from '../../../services/CreateRedmineService';
import DeleteRedmineService from '../../../services/DeleteRedmineService';
import ListRedmineService from '../../../services/ListRedmineService';
import ShowRedmineService from '../../../services/ShowRedmineService';
import UpdateRedmineService from '../../../services/UpdateRedmineService';
import ImportUsersRedmineService from '@modules/redmine/services/ImportUsersRedmineService';

export default class RedmineController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const listRedmines = container.resolve(ListRedmineService);

    const redmines = await listRedmines.execute({ user_id });

    return response.json(redmines);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const showRedmine = container.resolve(ShowRedmineService);

    const redmine = await showRedmine.execute({ user_id, id });

    return response.json(redmine);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, url, apiKey, project_import } = request.body;

    const createRedmine = container.resolve(CreateRedmineService);

    const redmine = await createRedmine.execute({
      user_id,
      name,
      url,
      apiKey,
      project_import,
    });

    const importUsersRedmineService = container.resolve(
      ImportUsersRedmineService,
    );
    importUsersRedmineService.execute(redmine);

    return response.json(redmine);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;
    const { name, url, apiKey, project_import } = request.body;

    const updateRedmine = container.resolve(UpdateRedmineService);

    const redmine = await updateRedmine.execute({
      user_id,
      id,
      name,
      url,
      apiKey,
      project_import,
    });

    const importUsersRedmineService = container.resolve(
      ImportUsersRedmineService,
    );
    await importUsersRedmineService.execute(redmine);

    return response.json(redmine);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const deleteRedmine = container.resolve(DeleteRedmineService);

    await deleteRedmine.execute({ user_id, id });

    return response.status(204).json();
  }

  public async syncUsersRedmine(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const showRedmine = container.resolve(ShowRedmineService);

    const redmine = await showRedmine.execute({ user_id, id });

    const importUsersRedmineService = container.resolve(
      ImportUsersRedmineService,
    );

    await importUsersRedmineService.execute(redmine);

    return response.status(204).json();
  }
}
