import { getCustomRepository } from 'typeorm';
import { RedmineRepository } from '../typeorm/repositories/RedmineRepository';
import Redmine from '../typeorm/entities/Redmine';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowRedmineService {
  public async execute({ id }: IRequest): Promise<Redmine> {
    const redmineRepository = getCustomRepository(RedmineRepository);

    const redmine = await redmineRepository.findOne(id);

    if (!redmine) {
      throw new AppError('Redmine not found.');
    }

    return redmine;
  }
}

export default ShowRedmineService;
