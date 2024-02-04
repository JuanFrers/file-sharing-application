import { UseCase } from '../UseCase';
import { ForbiddenError } from '../../../errors/ForbiddenError';

export interface AuthenticateInterface
  extends UseCase<AuthenticateInterfaceRequest, AuthenticateInterfaceResponse> {
  execute(
    authenticationToken: AuthenticateInterfaceRequest
  ): Promise<AuthenticateInterfaceResponse>;
}

export type AuthenticateInterfaceRequest = string;
export type AuthenticateInterfaceResponse = string | ForbiddenError;
