import { IRedmineUserImport } from '@modules/redmine/domain/models/IRedmineUserImport';
import { IRedmineUserImportRepository } from '@modules/redmine/domain/repositories/IRedmineUserImportRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  redmine_id: string;
}

@injectable()
class ListUsersRedmineService {
  constructor(
    @inject('RedmineUserImportRepository')
    private redmineUserImportRep: IRedmineUserImportRepository,
  ) {}

  public async execute({
    redmine_id,
  }: IRequest): Promise<IRedmineUserImport[]> {
    const users = await this.redmineUserImportRep.findByRedmine(redmine_id);

    return users;
  }
}

export default ListUsersRedmineService;
