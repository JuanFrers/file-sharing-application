import pathModule from 'path';
import { CreateFileInterface, CreateFileInterfaceRequest, CreateFileInterfaceResponse } from '../../interfaces/use-cases/file-management/CreateFileInterface';
import { FileAlreadyExistsError } from '../../errors/FileAlreadyExistsError';
import { GetFileByPathRepositoryInterface } from '../../../domain/repositories/file-management/GetFileByPathRepositoryInterface';
import { CreateFileMetadataRepositoryInterface } from '../../../domain/repositories/file-management/CreateFileMetadataRepositoryInterface';
import { UploadFileRepositoryInterface } from '../../../domain/repositories/file-management/UploadFileRepositoryInterface';

export class CreateFile implements CreateFileInterface {
  private createFileMetadataRepository: CreateFileMetadataRepositoryInterface | undefined;

  private getFileByPathRepository: GetFileByPathRepositoryInterface | undefined;

  constructor(private readonly uploadFileRepository: UploadFileRepositoryInterface) { }

  setupRuntimeDependencies(
    createFileMetadataRepository: CreateFileMetadataRepositoryInterface,
    getFileByPathRepository: GetFileByPathRepositoryInterface,
  ): void {
    this.createFileMetadataRepository = createFileMetadataRepository;
    this.getFileByPathRepository = getFileByPathRepository;
  }

  async execute(fileData: CreateFileInterfaceRequest): Promise<CreateFileInterfaceResponse> {
    if (!this.createFileMetadataRepository || !this.getFileByPathRepository) {
      throw new Error();
    }
    const { userId, path, size } = fileData;

    const finalPath = pathModule.join(String(userId), path);

    const existingFile = await this.getFileByPathRepository.getFileByPath(finalPath);
    if (existingFile) {
      return new FileAlreadyExistsError();
    }
    await this.uploadFileRepository.uploadFile({ ...fileData, path: finalPath });
    return this.createFileMetadataRepository.createFileMetadata({ path: finalPath, size, userId });
  }
}
