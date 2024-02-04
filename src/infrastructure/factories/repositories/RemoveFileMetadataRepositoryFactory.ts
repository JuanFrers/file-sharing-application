import { Connection } from 'mysql2/promise';
import { RemoveFileMetadataRepositoryInterface } from '../../../domain/repositories/file-management/RemoveFileMetadataRepositoryInterface';
import { RemoveFileMetadataRepository } from '../../mysql/repositories/file-management/RemoveFileMetadataRepository';

export const makeRemoveFileMetadataRepository = (connection: Connection):
RemoveFileMetadataRepositoryInterface => {
  return new RemoveFileMetadataRepository(connection);
};
