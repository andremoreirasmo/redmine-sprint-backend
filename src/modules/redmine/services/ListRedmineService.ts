import { getCustomRepository } from 'typeorm';
import { RedmineRepository } from '../typeorm/repositories/RedmineRepository';
import Redmine from '../typeorm/entities/Redmine';

class ListRedmineService {
  public async execute(): Promise<Redmine[]> {
    const redmineRepository = getCustomRepository(RedmineRepository);

    const redmines = redmineRepository.find();

    return redmines;
  }
}

export default ListRedmineService;
