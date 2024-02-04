import { Connection } from 'mysql2/promise';
import { GetUserByUsernameRepositoryInterface } from '../../../domain/repositories/authentication/GetUserByUsernameRepositoryInterface';
import { GetUserByUsernameRepository } from '../../mysql/repositories/users/GetUserByUsernameRepository';

export const makeGetUserByUsernameRepository = (connection: Connection):
GetUserByUsernameRepositoryInterface => {
  return new GetUserByUsernameRepository(connection);
};
