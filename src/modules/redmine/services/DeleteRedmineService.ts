import { getCustomRepository } from 'typeorm';
import { RedmineRepository } from '../typeorm/repositories/RedmineRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteRedmineService {
  public async execute({ id }: IRequest): Promise<void> {
    const redmineRepository = getCustomRepository(RedmineRepository);

    const redmine = await redmineRepository.findOne(id);

    if (!redmine) {
      throw new AppError('Redmine not found.');
    }

    redmineRepository.remove(redmine);
  }
}

export default DeleteRedmineService;
