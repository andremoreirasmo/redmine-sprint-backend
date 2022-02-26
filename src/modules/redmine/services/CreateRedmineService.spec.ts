import 'reflect-metadata';
import CreateRedmineService from './CreateRedmineService';
import { FakeRedmineRepository } from '@modules/redmine/domain/repositories/fakes/FakeRedmineRepository';

describe('CreateRedmine', () => {
  it('should be able to create a new redmine', async () => {
    const fakeRedmineRepository = new FakeRedmineRepository();

    const createRedmine = new CreateRedmineService(fakeRedmineRepository);

    const redmine = await createRedmine.execute({
      user_id: '1',
      name: 'Redmine',
      url: 'http://localhost',
      apiKey: 'edd2',
      project_import: 1,
    });

    expect(redmine).toHaveProperty('id'); //Todo: Melhorar teste
  });
});
