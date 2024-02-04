import { FilePermissionEntityProps } from '../../FilePermissionEntityProps';

export interface AddFilePermissionRepositoryInterface {
  addFilePermission(
    permissionData: AddFilePermissionRepositoryRequest
  ): Promise<AddFilePermissionRepositoryResponse>;
}

export type AddFilePermissionRepositoryRequest = Omit<FilePermissionEntityProps, 'createdAt'>;
export type AddFilePermissionRepositoryResponse = void;
