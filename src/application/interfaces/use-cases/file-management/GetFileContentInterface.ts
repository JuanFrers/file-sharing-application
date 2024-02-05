import { Readable } from 'stream';
import { UseCase } from '../UseCase';
import { NoSuchFileError } from '../../../errors/NoSuchFileError';
import { PermissionError } from '../../../../infrastructure/http/errors/PermissionError';

export interface GetFileContentInterface
  extends UseCase<GetFileContentInterfaceRequest, GetFileContentInterfaceResponse> {
  execute(FileData: GetFileContentInterfaceRequest): Promise<GetFileContentInterfaceResponse>;
}

export type GetFileContentInterfaceRequest = { path: string, userId: number };
export type GetFileContentInterfaceResponse =
{ stream: Readable, mimeType: string } | NoSuchFileError | PermissionError;
