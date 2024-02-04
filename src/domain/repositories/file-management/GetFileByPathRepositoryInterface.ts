import { FileEntityProps } from '../../FileEntityProps';

export interface GetFileByPathRepositoryInterface {
  getFileByPath(
    path: GetFileByPathRepositoryRequest
  ): Promise<GetFileByPathRepositoryResponse>;
}

export type GetFileByPathRepositoryRequest = string;
export type GetFileByPathRepositoryResponse = FileEntityProps & { userId: number };
