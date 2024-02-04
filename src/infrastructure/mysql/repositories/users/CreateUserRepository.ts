import { Connection } from 'mysql2/promise';
import { CreateUserRepositoryInterface, CreateUserRepositoryRequest, CreateUserRepositoryResponse } from '../../../../domain/repositories/authentication/CreateUserRepositoryInterface';

export class CreateUserRepository implements
  CreateUserRepositoryInterface {
  constructor(private readonly connection: Connection) {}

  async createUser(
    userData: CreateUserRepositoryRequest,
  ): Promise<CreateUserRepositoryResponse> {
    const {
      email, name, password, username,
    } = userData;

    await this.connection.query(
      'INSERT INTO user (name, email, username, password) VALUES(?,?,?,?)',
      [name, email, username, password],
    );
  }
}
