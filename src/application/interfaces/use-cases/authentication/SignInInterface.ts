import { UseCase } from '../UseCase';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';

export interface SignInInterface
  extends UseCase<SignInInterfaceRequest, SignInInterfaceResponse> {
  execute(credentials: SignInInterfaceRequest): Promise<SignInInterfaceResponse>;
}

export type SignInInterfaceRequest = { username: string; password: string };
export type SignInInterfaceResponse = string | UnauthorizedError;
