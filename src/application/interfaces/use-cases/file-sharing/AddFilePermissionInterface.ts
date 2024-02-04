import { NoSuchFileError } from '../../../errors/NoSuchFileError';
import { ForbiddenError } from '../../../errors/ForbiddenError';
import { UseCase } from '../UseCase';

export interface AddFilePermissionInterface
  extends UseCase<AddFilePermissionInterfaceRequest, AddFilePermissionInterfaceResponse> {
  execute(FileData: AddFilePermissionInterfaceRequest): Promise<AddFilePermissionInterfaceResponse>;
}

export type AddFilePermissionInterfaceRequest = {
  path: string,
  username: string,
  loggedUserId: number
};
export type AddFilePermissionInterfaceResponse = void | NoSuchFileError | ForbiddenError;
