import { Connection, RowDataPacket } from 'mysql2/promise';
import { ListFilesRepositoryInterface, ListFilesRepositoryRequest, ListFilesRepositoryResponse } from '../../../../domain/repositories/file-management/ListFilesRepositoryInterface';

interface ListFileContent extends RowDataPacket, ListFilesRepositoryResponse { }

export class ListFilesRepository implements
  ListFilesRepositoryInterface {
  constructor(private readonly connection: Connection) { }

  async listFiles(
    req: ListFilesRepositoryRequest,
  ): Promise<ListFilesRepositoryResponse[]> {
    const { userId, page } = req;
    const limit = 10;
    const [res] = await this.connection.query<ListFileContent[]>(
      `SELECT CASE WHEN fo.user_id=? THEN "READ/WRITE" WHEN fp.user_id=?
      THEN "READ" END AS permission, path, size, f.created_at AS createdAt
      FROM file f LEFT JOIN file_owner fo 
      ON fo.file_id=f.id LEFT JOIN
      file_permission fp ON fp.file_id=f.id
      WHERE fo.user_id=? OR fp.user_id=?
      LIMIT ? OFFSET ?`,
      [userId, userId, userId, userId, limit, (page || 0) * limit],
    );

    return res;
  }
}
