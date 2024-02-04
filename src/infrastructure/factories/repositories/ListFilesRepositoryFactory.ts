import { Connection } from 'mysql2/promise';
import { ListFilesRepositoryInterface } from '../../../domain/repositories/file-management/ListFilesRepositoryInterface';
import { ListFilesRepository } from '../../mysql/repositories/file-management/ListFilesRepository';

export const makeListFilesRepository = (connection: Connection): ListFilesRepositoryInterface => {
  return new ListFilesRepository(connection);
};
