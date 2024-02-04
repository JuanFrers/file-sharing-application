import { FileEntityProps } from '../../FileEntityProps';

export interface ListFilesRepositoryInterface {
  listFiles(
    fileData: ListFilesRepositoryRequest
  ): Promise<ListFilesRepositoryResponse[]>;
}

export type ListFilesRepositoryRequest = { page?: number, userId: number };
export type ListFilesRepositoryResponse = { permission: string } & Omit<FileEntityProps, 'id' | 'userId'>;
