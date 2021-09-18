import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { RedmineRepository } from '../typeorm/repositories/RedmineRepository';
import Redmine from '../typeorm/entities/Redmine';

interface IRequest {
  name: string;
  url: string;
  apiKey: string;
}

class CreteRedmineService {
  public async execute({ name, url, apiKey }: IRequest): Promise<Redmine> {
    const redmineRepository = getCustomRepository(RedmineRepository);
    const redmineExists = await redmineRepository.findByName(name);

    if (redmineExists) {
      throw new AppError(`Redmine ${name} already exists`);
    }

    const redmine = redmineRepository.create({
      name,
      url,
      apiKey,
    });

    await redmineRepository.save(redmine);

    return redmine;
  }
}

export default CreteRedmineService;
