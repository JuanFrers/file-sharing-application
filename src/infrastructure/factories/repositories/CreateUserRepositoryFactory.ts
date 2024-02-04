import { Connection } from 'mysql2/promise';
import { CreateUserRepositoryInterface } from '../../../domain/repositories/authentication/CreateUserRepositoryInterface';
import { CreateUserRepository } from '../../mysql/repositories/users/CreateUserRepository';

export const makeCreateUserRepository = (connection: Connection): CreateUserRepositoryInterface => {
  return new CreateUserRepository(connection);
};
