import 'reflect-metadata';
import CreateRedmineService from './CreateRedmineService';
import { FakeRedmineRepository } from '@modules/redmine/domain/repositories/fakes/FakeRedmineRepository';

let fakeRedmineRepository: FakeRedmineRepository;
let createRedmine: CreateRedmineService;

describe('CreateRedmine', () => {
  beforeEach(() => {
    fakeRedmineRepository = new FakeRedmineRepository();
    createRedmine = new CreateRedmineService(fakeRedmineRepository);
  });

  it('should be able to create a new redmine', async () => {
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
