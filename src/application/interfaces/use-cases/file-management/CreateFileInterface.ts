import { FileAlreadyExistsError } from '../../../errors/FileAlreadyExistsError';
import { UseCase } from '../UseCase';

export interface CreateFileInterface
  extends UseCase<CreateFileInterfaceRequest, CreateFileInterfaceResponse> {
  execute(FileData: CreateFileInterfaceRequest): Promise<CreateFileInterfaceResponse>;
}

export type CreateFileInterfaceRequest =
{ payload: Buffer, userId: number, path: string, size: number, mimeType: string };
export type CreateFileInterfaceResponse = void | FileAlreadyExistsError;
