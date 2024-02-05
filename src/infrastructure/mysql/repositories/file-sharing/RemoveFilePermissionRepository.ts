import { Connection } from 'mysql2/promise';
import { RemoveFilePermissionRepositoryInterface, RemoveFilePermissionRepositoryRequest, RemoveFilePermissionRepositoryResponse } from '../../../../domain/repositories/file-sharing/RemoveFilePermissionRepositoryInterface';

export class RemoveFilePermissionRepository implements
  RemoveFilePermissionRepositoryInterface {
  constructor(private readonly connection: Connection) {}

  async removeFilePermission(
    permissionData: RemoveFilePermissionRepositoryRequest,
  ): Promise<RemoveFilePermissionRepositoryResponse> {
    const { userId, fileId } = permissionData;

    await this.connection.query(
      `DELETE FROM file_permission
       WHERE user_id=? AND file_id=?`,
      [userId, fileId],
    );
  }
}
