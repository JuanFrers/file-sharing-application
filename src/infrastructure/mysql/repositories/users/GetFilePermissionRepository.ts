import { Connection, RowDataPacket } from 'mysql2/promise';
import { GetFilePermissionRepositoryInterface, GetFilePermissionRepositoryRequest, GetFilePermissionRepositoryResponse } from '../../../../domain/repositories/file-management/GetFilePermissionRepositoryInterface';

interface IFile extends RowDataPacket, GetFilePermissionRepositoryResponse { }

export class GetFilePermissionRepository implements
  GetFilePermissionRepositoryInterface {
  constructor(private readonly connection: Connection) { }

  async getFilePermission(
    req: GetFilePermissionRepositoryRequest,
  ): Promise<GetFilePermissionRepositoryResponse> {
    const [res] = await (this.connection.query<IFile[]>(
      `SELECT file_id as fileId, user_id as userId, created_at as createdAt
       FROM file_permission WHERE file_id=? AND user_id=?`,
      [req.fileId, req.userId],
    ));

    return res[0] || null;
  }
}
