import { inject, injectable } from 'tsyringe';
import { IRedmineUserImportRepository } from '../domain/repositories/IRedmineUserImportRepository';
import Redmine from '../infra/typeorm/entities/Redmine';
import { IApiRedmineGetUsersProvider } from '../providers/ApiRedmineProvider/models/IApiRedmineGetUsersProvider';

@injectable()
class ImportUsersRedmineService {
  constructor(
    @inject('ApiRedmineGetUsersProvider')
    private apiRedmineGetUsersProvider: IApiRedmineGetUsersProvider,
    @inject('RedmineUserImportRepository')
    private redmineUserImportRep: IRedmineUserImportRepository,
  ) {}

  public async execute(redmine: Redmine): Promise<void> {
    const users = await this.apiRedmineGetUsersProvider.get(
      redmine.url,
      redmine.apiKey,
      redmine.project_import,
    );

    const savedUsers = await this.redmineUserImportRep.findByRedmine(
      redmine.id,
    );
    const mapSavedUsers = new Map(
      savedUsers.map(user => [user.id_user_redmine, user]),
    );

    users.forEach(userRedmine => {
      const savedUser = mapSavedUsers.get(userRedmine.id);

      if (savedUser) {
        savedUser.name = userRedmine.name;
        this.redmineUserImportRep.save(savedUser);
      } else {
        this.redmineUserImportRep.create({
          name: userRedmine.name,
          redmine_id: redmine.id,
          id_user_redmine: userRedmine.id,
        });
      }
    });
  }
}

export default ImportUsersRedmineService;