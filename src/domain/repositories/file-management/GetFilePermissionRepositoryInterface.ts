import { FilePermissionEntityProps } from '../../FilePermissionEntityProps';

export interface GetFilePermissionRepositoryInterface {
  getFilePermission(
    path: GetFilePermissionRepositoryRequest
  ): Promise<GetFilePermissionRepositoryResponse>;
}

export type GetFilePermissionRepositoryRequest = { fileId: number, userId: number };
export type GetFilePermissionRepositoryResponse = FilePermissionEntityProps;
