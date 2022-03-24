import { IApiRedmineGetUsersProvider } from '@modules/apiRedmine/domain/providers/IApiRedmineGetUsersProvider';
import { inject, injectable } from 'tsyringe';
import { IRedmine } from '../domain/models/IRedmine';
import { IRedmineUserImportRepository } from '../domain/repositories/IRedmineUserImportRepository';

@injectable()
class ImportUsersRedmineService {
  constructor(
    @inject('ApiRedmineGetUsersProvider')
    private apiRedmineGetUsersProvider: IApiRedmineGetUsersProvider,
    @inject('RedmineUserImportRepository')
    private redmineUserImportRep: IRedmineUserImportRepository,
  ) {}

  public async execute(redmine: IRedmine): Promise<void> {
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
