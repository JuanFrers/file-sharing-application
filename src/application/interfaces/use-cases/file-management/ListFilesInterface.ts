import { FileEntityProps } from '../../../../domain/FileEntityProps';
import { UseCase } from '../UseCase';

export interface ListFilesInterface
  extends UseCase<ListFilesInterfaceRequest, ListFilesInterfaceResponse> {
  execute(FileData: ListFilesInterfaceRequest): Promise<ListFilesInterfaceResponse>;
}

export type ListFilesInterfaceRequest = { page?: number, userId: number };
export type ListFilesInterfaceResponse = Array<{ permission: string, size: string } & Omit<FileEntityProps, 'size' | 'id' | 'userId'>>;
