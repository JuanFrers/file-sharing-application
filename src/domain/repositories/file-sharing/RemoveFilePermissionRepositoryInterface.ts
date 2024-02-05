import { FilePermissionEntityProps } from '../../FilePermissionEntityProps';

export interface RemoveFilePermissionRepositoryInterface {
  removeFilePermission(
    permissionData: RemoveFilePermissionRepositoryRequest
  ): Promise<RemoveFilePermissionRepositoryResponse>;
}

export type RemoveFilePermissionRepositoryRequest = Omit<FilePermissionEntityProps, 'createdAt'>;
export type RemoveFilePermissionRepositoryResponse = void;
