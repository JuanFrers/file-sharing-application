export interface CreateFileMetadataRepositoryInterface {
  createFileMetadata(
    fileData: CreateFileMetadataRepositoryRequest
  ): Promise<CreateFileMetadataRepositoryResponse>;
}

export type CreateFileMetadataRepositoryRequest = { userId: number, path: string, size: number };
export type CreateFileMetadataRepositoryResponse = void;
