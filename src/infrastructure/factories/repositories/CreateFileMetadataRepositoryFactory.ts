import { Connection } from 'mysql2/promise';
import { CreateFileMetadataRepositoryInterface } from '../../../domain/repositories/file-management/CreateFileMetadataRepositoryInterface';
import { CreateFileMetadataRepository } from '../../mysql/repositories/file-management/CreateFileMetadataRepository';

export const makeCreateFileMetadataRepository = (connection: Connection):
CreateFileMetadataRepositoryInterface => {
  return new CreateFileMetadataRepository(connection);
};
