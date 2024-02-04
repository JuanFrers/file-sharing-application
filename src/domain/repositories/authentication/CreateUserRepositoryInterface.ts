import { UserEntityProps } from '../../UserEntityProps';

export interface CreateUserRepositoryInterface {
  createUser(
    userData: CreateUserRepositoryRequest
  ): Promise<CreateUserRepositoryResponse>;
}

export type CreateUserRepositoryRequest = Omit<UserEntityProps, 'id' | 'createdAt'>;
export type CreateUserRepositoryResponse = void;
