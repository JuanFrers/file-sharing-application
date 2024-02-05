import { RemoveFilePermissionInterface, RemoveFilePermissionInterfaceRequest, RemoveFilePermissionInterfaceResponse } from '../../interfaces/use-cases/file-sharing/RemoveFilePermissionInterface';
import { ForbiddenError } from '../../errors/ForbiddenError';
import { NoSuchFileError } from '../../errors/NoSuchFileError';
import { NoSuchUserError } from '../../errors/NoSuchUserError';
import { GetUserByUsernameRepositoryInterface } from '../../../domain/repositories/authentication/GetUserByUsernameRepositoryInterface';
import { GetFileByPathRepositoryInterface } from '../../../domain/repositories/file-management/GetFileByPathRepositoryInterface';
import { RemoveFilePermissionRepositoryInterface } from '../../../domain/repositories/file-sharing/RemoveFilePermissionRepositoryInterface';

export class RemoveFilePermission implements RemoveFilePermissionInterface {
  private removeFilePermissionRepository: RemoveFilePermissionRepositoryInterface | undefined;

  private getFileByPathRepository: GetFileByPathRepositoryInterface | undefined;

  private getUserByUsernameRepository: GetUserByUsernameRepositoryInterface | undefined;

  setupRuntimeDependencies(
    removeFilePermissionRepository: RemoveFilePermissionRepositoryInterface,
    getFileByPathRepository: GetFileByPathRepositoryInterface,
    getUserByUsernameRepository: GetUserByUsernameRepositoryInterface,
  ): void {
    this.removeFilePermissionRepository = removeFilePermissionRepository;
    this.getFileByPathRepository = getFileByPathRepository;
    this.getUserByUsernameRepository = getUserByUsernameRepository;
  }

  async execute(permissionData: RemoveFilePermissionInterfaceRequest):
  Promise<RemoveFilePermissionInterfaceResponse> {
    if (!this.removeFilePermissionRepository
      || !this.getFileByPathRepository
      || !this.getUserByUsernameRepository) {
      throw new Error();
    }
    const targetFile = await this.getFileByPathRepository.getFileByPath(permissionData.path);
    if (!targetFile) {
      return new NoSuchFileError();
    }
    if (targetFile.userId !== permissionData.loggedUserId) {
      return new ForbiddenError('file not owned');
    }
    const targetUser = await this.getUserByUsernameRepository
      .getUserByUsername(permissionData.username);
    if (!targetUser) {
      return new NoSuchUserError();
    }
    if (targetUser.id !== permissionData.loggedUserId) {
      return this.removeFilePermissionRepository
        .removeFilePermission({ userId: targetUser.id, fileId: targetFile.id });
    }
    return undefined;
  }
}
