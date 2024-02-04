import { UseCase } from '../UseCase';
import { UserEntityProps } from '../../../../domain/UserEntityProps';
import { UsernameInUseError } from '../../../errors/UsernameInUseError';

export interface SignUpInterface
  extends UseCase<SignUpInterfaceRequest, SignUpInterfaceResponse> {
  execute(userData: SignUpInterfaceRequest): Promise<SignUpInterfaceResponse>;
}
export type SignUpInterfaceRequest = Omit<UserEntityProps, 'id' | 'createdAt'>;
export type SignUpInterfaceResponse = void | UsernameInUseError;
