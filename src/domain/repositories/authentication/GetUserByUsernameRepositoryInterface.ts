import { UserEntityProps } from '../../UserEntityProps';

export interface GetUserByUsernameRepositoryInterface {
  getUserByUsername(
    email: GetUserByUsernameRepositoryRequest
  ): Promise<GetUserByUsernameRepositoryResponse>;
}

export type GetUserByUsernameRepositoryRequest = string;
export type GetUserByUsernameRepositoryResponse = UserEntityProps | null;
