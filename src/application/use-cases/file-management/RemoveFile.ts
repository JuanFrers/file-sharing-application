import { RemoveFileInterface, RemoveFileInterfaceRequest, RemoveFileInterfaceResponse } from '../../interfaces/use-cases/file-management/RemoveFileInterface';
import { RemoveFileMetadataRepositoryInterface } from '../../../domain/repositories/file-management/RemoveFileMetadataRepositoryInterface';
import { RemoveFileRepositoryInterface } from '../../../domain/repositories/file-management/RemoveFileRepositoryInterface';
import { GetFileByPathRepositoryInterface } from '../../../domain/repositories/file-management/GetFileByPathRepositoryInterface';
import { NoSuchFileError } from '../../errors/NoSuchFileError';
import { ForbiddenError } from '../../errors/ForbiddenError';

export class RemoveFile implements RemoveFileInterface {
  private removeFileMetadataRepository: RemoveFileMetadataRepositoryInterface | undefined;

  private getFileByPathRepository: GetFileByPathRepositoryInterface | undefined;

  constructor(private readonly removeFileRepository: RemoveFileRepositoryInterface) { }

  setupRuntimeDependencies(
    removeFileMetadataRepository: RemoveFileMetadataRepositoryInterface,
    getFileByPathRepository: GetFileByPathRepositoryInterface,
  ): void {
    this.removeFileMetadataRepository = removeFileMetadataRepository;
    this.getFileByPathRepository = getFileByPathRepository;
  }

  async execute(fileData: RemoveFileInterfaceRequest): Promise<RemoveFileInterfaceResponse> {
    if (!this.removeFileMetadataRepository || !this.getFileByPathRepository) {
      throw new Error();
    }
    const existingFile = await this.getFileByPathRepository.getFileByPath(fileData.path);
    if (!existingFile) {
      return new NoSuchFileError();
    }
    if (existingFile.userId !== fileData.userId) {
      return new ForbiddenError();
    }
    await this.removeFileMetadataRepository.removeFileMetadata(fileData);
    return this.removeFileRepository.removeFile(fileData);
  }
}
