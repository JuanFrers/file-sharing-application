import { Connection } from 'mysql2/promise';
import { AddFilePermissionRepositoryInterface } from '../../../domain/repositories/file-sharing/AddFilePermissionRepositoryInterface';
import { AddFilePermissionRepository } from '../../mysql/repositories/file-sharing/AddFilePermissionRepository';

export const makeAddFilePermissionRepository = (connection: Connection):
AddFilePermissionRepositoryInterface => {
  return new AddFilePermissionRepository(connection);
};
