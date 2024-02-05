import { GetFileContentInterface, GetFileContentInterfaceRequest, GetFileContentInterfaceResponse } from '../../interfaces/use-cases/file-management/GetFileContentInterface';
import { GetFileContentRepositoryInterface } from '../../../domain/repositories/file-management/GetFileContentRepositoryInterface';
import { GetFileByPathRepositoryInterface } from '../../../domain/repositories/file-management/GetFileByPathRepositoryInterface';
import { GetFilePermissionRepositoryInterface } from '../../../domain/repositories/file-management/GetFilePermissionRepositoryInterface';
import { NoSuchFileError } from '../../errors/NoSuchFileError';
import { PermissionError } from '../../../infrastructure/http/errors/PermissionError';

export class GetFileContent implements GetFileContentInterface {
  private getFileByPathRepository: GetFileByPathRepositoryInterface | undefined;

  private getFilePermissionRepository: GetFilePermissionRepositoryInterface | undefined;

  constructor(private readonly getFileContentRepository: GetFileContentRepositoryInterface) { }

  setupRuntimeDependencies(
    getFileByPathRepository: GetFileByPathRepositoryInterface,
    getFilePermissionRepository: GetFilePermissionRepositoryInterface,
  ): void {
    this.getFileByPathRepository = getFileByPathRepository;
    this.getFilePermissionRepository = getFilePermissionRepository;
  }

  async execute(req: GetFileContentInterfaceRequest): Promise<GetFileContentInterfaceResponse> {
    const { path, userId } = req;
    if (!this.getFileByPathRepository || !this.getFilePermissionRepository) {
      throw new Error();
    }
    const file = await this.getFileByPathRepository.getFileByPath(path);
    if (!file) {
      return new NoSuchFileError();
    }
    if (userId !== file.userId) {
      const permission = await this.getFilePermissionRepository
        .getFilePermission({ fileId: file.id, userId });
      if (!permission) {
        return new PermissionError();
      }
    }
    const res = await this.getFileContentRepository.getFileContent(req);
    if (!res) {
      return new NoSuchFileError();
    }
    return res;
  }
}
