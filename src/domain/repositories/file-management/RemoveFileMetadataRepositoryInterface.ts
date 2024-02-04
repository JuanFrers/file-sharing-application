export interface RemoveFileMetadataRepositoryInterface {
  removeFileMetadata(
    fileData: RemoveFileMetadataRepositoryRequest
  ): Promise<RemoveFileMetadataRepositoryResponse>;
}

export type RemoveFileMetadataRepositoryRequest = { path: string };
export type RemoveFileMetadataRepositoryResponse = void;
