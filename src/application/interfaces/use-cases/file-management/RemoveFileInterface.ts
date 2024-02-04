import { NoSuchFileError } from '../../../errors/NoSuchFileError';
import { ForbiddenError } from '../../../errors/ForbiddenError';
import { UseCase } from '../UseCase';

export interface RemoveFileInterface
  extends UseCase<RemoveFileInterfaceRequest, RemoveFileInterfaceResponse> {
  execute(FileData: RemoveFileInterfaceRequest): Promise<RemoveFileInterfaceResponse>;
}

export type RemoveFileInterfaceRequest = { path: string, userId: number };
export type RemoveFileInterfaceResponse = void | NoSuchFileError | ForbiddenError;
