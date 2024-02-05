import { Connection } from 'mysql2/promise';
import { RemoveFilePermissionRepositoryInterface } from '../../../domain/repositories/file-sharing/RemoveFilePermissionRepositoryInterface';
import { RemoveFilePermissionRepository } from '../../mysql/repositories/file-sharing/RemoveFilePermissionRepository';

export const makeRemoveFilePermissionRepository = (connection: Connection):
RemoveFilePermissionRepositoryInterface => {
  return new RemoveFilePermissionRepository(connection);
};
