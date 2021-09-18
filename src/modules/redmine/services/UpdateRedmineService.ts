import { getCustomRepository } from 'typeorm';
import { RedmineRepository } from '../typeorm/repositories/RedmineRepository';
import Redmine from '../typeorm/entities/Redmine';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  url: string;
  apiKey: string;
}

class UpdateRedmineService {
  public async execute({ id, name, url, apiKey }: IRequest): Promise<Redmine> {
    const redmineRepository = getCustomRepository(RedmineRepository);

    const redmine = await redmineRepository.findOne(id);

    if (!redmine) {
      throw new AppError('Redmine not found.');
    }

    const redmineExists = await redmineRepository.findByName(name);

    if (redmineExists) {
      throw new AppError(`Redmine ${name} already exists`);
    }

    redmine.name = name;
    redmine.url = url;
    redmine.apiKey = apiKey;

    await redmineRepository.save(redmine);

    return redmine;
  }
}

export default UpdateRedmineService;
