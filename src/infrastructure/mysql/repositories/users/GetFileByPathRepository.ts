import { Connection, RowDataPacket } from 'mysql2/promise';
import { GetFileByPathRepositoryInterface, GetFileByPathRepositoryRequest, GetFileByPathRepositoryResponse } from '../../../../domain/repositories/file-management/GetFileByPathRepositoryInterface';

interface IFile extends RowDataPacket, GetFileByPathRepositoryResponse { }

export class GetFileByPathRepository implements
  GetFileByPathRepositoryInterface {
  constructor(private readonly connection: Connection) { }

  async getFileByPath(
    path: GetFileByPathRepositoryRequest,
  ): Promise<GetFileByPathRepositoryResponse> {
    const [res] = await (this.connection.query<IFile[]>(
      `SELECT id, user_id as userId, path, f.created_at as createdAt
      FROM file f JOIN file_owner ON id=file_id WHERE path = ?`,
      [path],
    ));

    return res[0] || null;
  }
}
