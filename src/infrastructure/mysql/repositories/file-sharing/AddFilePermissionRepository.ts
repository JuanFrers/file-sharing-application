import { Connection } from 'mysql2/promise';
import { AddFilePermissionRepositoryInterface, AddFilePermissionRepositoryRequest, AddFilePermissionRepositoryResponse } from '../../../../domain/repositories/file-sharing/AddFilePermissionRepositoryInterface';

export class AddFilePermissionRepository implements
  AddFilePermissionRepositoryInterface {
  constructor(private readonly connection: Connection) {}

  async addFilePermission(
    permissionData: AddFilePermissionRepositoryRequest,
  ): Promise<AddFilePermissionRepositoryResponse> {
    const { userId, fileId } = permissionData;

    await this.connection.query(
      `INSERT INTO file_permission (user_id, file_id) VALUES(?,?) 
      ON DUPLICATE KEY UPDATE user_id=user_id, file_id=file_id`,
      [userId, fileId],
    );
  }
}
