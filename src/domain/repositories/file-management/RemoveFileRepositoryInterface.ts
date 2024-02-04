export interface RemoveFileRepositoryInterface {
  removeFile(
    fileData: RemoveFileRepositoryRequest
  ): Promise<RemoveFileRepositoryResponse>;
}

export type RemoveFileRepositoryRequest = { path: string };
export type RemoveFileRepositoryResponse = void;
