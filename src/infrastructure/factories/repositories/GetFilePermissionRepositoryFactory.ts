import { Connection } from 'mysql2/promise';
import { GetFilePermissionRepositoryInterface } from '../../../domain/repositories/file-management/GetFilePermissionRepositoryInterface';
import { GetFilePermissionRepository } from '../../mysql/repositories/users/GetFilePermissionRepository';

export const makeGetFilePermissionRepository = (connection: Connection):
GetFilePermissionRepositoryInterface => {
  return new GetFilePermissionRepository(connection);
};
