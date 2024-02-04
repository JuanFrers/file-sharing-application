export interface UploadFileRepositoryInterface {
  uploadFile(
    fileData: UploadFileRepositoryRequest
  ): Promise<UploadFileRepositoryResponse>;
}

export type UploadFileRepositoryRequest = {
  payload: Buffer,
  userId: number,
  path: string,
  mimeType: string
};
export type UploadFileRepositoryResponse = void;
