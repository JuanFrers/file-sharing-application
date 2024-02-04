import { Connection, RowDataPacket } from 'mysql2/promise';
import { GetUserByUsernameRepositoryInterface, GetUserByUsernameRepositoryRequest, GetUserByUsernameRepositoryResponse } from '../../../../domain/repositories/authentication/GetUserByUsernameRepositoryInterface';
import { UserEntityProps } from '../../../../domain/UserEntityProps';

interface IUser extends RowDataPacket, UserEntityProps { }

export class GetUserByUsernameRepository implements
  GetUserByUsernameRepositoryInterface {
  constructor(private readonly connection: Connection) { }

  async getUserByUsername(
    username: GetUserByUsernameRepositoryRequest,
  ): Promise<GetUserByUsernameRepositoryResponse> {
    const [res] = await (this.connection.query<IUser[]>(
      'SELECT * FROM user WHERE username = ?',
      [username],
    ));

    return res[0] || null;
  }
}
