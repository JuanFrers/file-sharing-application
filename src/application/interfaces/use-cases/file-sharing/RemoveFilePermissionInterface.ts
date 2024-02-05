import { NoSuchFileError } from '../../../errors/NoSuchFileError';
import { ForbiddenError } from '../../../errors/ForbiddenError';
import { UseCase } from '../UseCase';

export interface RemoveFilePermissionInterface
  extends UseCase<RemoveFilePermissionInterfaceRequest, RemoveFilePermissionInterfaceResponse> {
  execute(FileData: RemoveFilePermissionInterfaceRequest):
  Promise<RemoveFilePermissionInterfaceResponse>;
}

export type RemoveFilePermissionInterfaceRequest = {
  path: string,
  username: string,
  loggedUserId: number
};
export type RemoveFilePermissionInterfaceResponse = void | NoSuchFileError | ForbiddenError;
