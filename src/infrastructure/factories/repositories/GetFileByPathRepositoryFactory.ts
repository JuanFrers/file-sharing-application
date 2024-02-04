import { Connection } from 'mysql2/promise';
import { GetFileByPathRepositoryInterface } from '../../../domain/repositories/file-management/GetFileByPathRepositoryInterface';
import { GetFileByPathRepository } from '../../mysql/repositories/users/GetFileByPathRepository';

export const makeGetFileByPathRepository = (connection: Connection):
GetFileByPathRepositoryInterface => {
  return new GetFileByPathRepository(connection);
};
