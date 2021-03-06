import FakeUsersRepository from '@modules/user/domain/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from './CreateSessionsService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Jorge Aluizio',
      email: 'teste@teste.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'teste@teste.com',
      password: '123456',
      rememberMe: true,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user', async () => {
    expect(
      createSession.execute({
        email: 'teste@teste.com',
        password: '123456',
        rememberMe: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jorge Aluizio',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'teste@teste.com',
        password: '567890',
        rememberMe: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
