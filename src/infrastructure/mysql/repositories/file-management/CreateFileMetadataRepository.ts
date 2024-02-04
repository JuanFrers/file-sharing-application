import { Connection } from 'mysql2/promise';
import { CreateFileMetadataRepositoryInterface, CreateFileMetadataRepositoryRequest, CreateFileMetadataRepositoryResponse } from '../../../../domain/repositories/file-management/CreateFileMetadataRepositoryInterface';

export class CreateFileMetadataRepository implements
  CreateFileMetadataRepositoryInterface {
  constructor(private readonly connection: Connection) { }

  async createFileMetadata(
    fileData: CreateFileMetadataRepositoryRequest,
  ): Promise<CreateFileMetadataRepositoryResponse> {
    const { userId, path, size } = fileData;

    await this.connection.query(
      'INSERT INTO file (path, size) VALUES(?,?)',
      [path, size],
    );
    await this.connection.query(
      `INSERT INTO file_owner (file_id, user_id)
       VALUES (LAST_INSERT_ID(), ?)`,
      [userId],
    );
  }
}
