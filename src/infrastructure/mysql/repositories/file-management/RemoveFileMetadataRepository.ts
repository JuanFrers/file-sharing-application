import { Connection } from 'mysql2/promise';
import { RemoveFileMetadataRepositoryInterface, RemoveFileMetadataRepositoryRequest, RemoveFileMetadataRepositoryResponse } from '../../../../domain/repositories/file-management/RemoveFileMetadataRepositoryInterface';

export class RemoveFileMetadataRepository implements
  RemoveFileMetadataRepositoryInterface {
  constructor(private readonly connection: Connection) {}

  async removeFileMetadata(
    fileData: RemoveFileMetadataRepositoryRequest,
  ): Promise<RemoveFileMetadataRepositoryResponse> {
    const { path } = fileData;

    await this.connection.query(
      'DELETE FROM file WHERE path = ?',
      [path],
    );
  }
}
