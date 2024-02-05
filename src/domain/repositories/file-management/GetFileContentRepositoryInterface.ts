import { Readable } from 'stream';

export interface GetFileContentRepositoryInterface {
  getFileContent(
    path: GetFileContentRepositoryRequest
  ): Promise<GetFileContentRepositoryResponse>;
}

export type GetFileContentRepositoryRequest = { path: string };
export type GetFileContentRepositoryResponse = { stream: Readable, mimeType: string } | undefined;
