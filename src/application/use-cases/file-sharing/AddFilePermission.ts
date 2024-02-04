import { AddFilePermissionInterface, AddFilePermissionInterfaceRequest, AddFilePermissionInterfaceResponse } from '../../interfaces/use-cases/file-sharing/AddFilePermissionInterface';
import { ForbiddenError } from '../../errors/ForbiddenError';
import { NoSuchFileError } from '../../errors/NoSuchFileError';
import { NoSuchUserError } from '../../errors/NoSuchUserError';
import { GetUserByUsernameRepositoryInterface } from '../../../domain/repositories/authentication/GetUserByUsernameRepositoryInterface';
import { GetFileByPathRepositoryInterface } from '../../../domain/repositories/file-management/GetFileByPathRepositoryInterface';
import { AddFilePermissionRepositoryInterface } from '../../../domain/repositories/file-sharing/AddFilePermissionRepositoryInterface';

export class AddFilePermission implements AddFilePermissionInterface {
  private addFilePermissionRepository: AddFilePermissionRepositoryInterface | undefined;

  private getFileByPathRepository: GetFileByPathRepositoryInterface | undefined;

  private getUserByUsernameRepository: GetUserByUsernameRepositoryInterface | undefined;

  setupRuntimeDependencies(
    addFilePermissionRepository: AddFilePermissionRepositoryInterface,
    getFileByPathRepository: GetFileByPathRepositoryInterface,
    getUserByUsernameRepository: GetUserByUsernameRepositoryInterface,
  ): void {
    this.addFilePermissionRepository = addFilePermissionRepository;
    this.getFileByPathRepository = getFileByPathRepository;
    this.getUserByUsernameRepository = getUserByUsernameRepository;
  }

  async execute(permissionData: AddFilePermissionInterfaceRequest):
  Promise<AddFilePermissionInterfaceResponse> {
    if (!this.addFilePermissionRepository
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
    if (targetUser.id === permissionData.loggedUserId) {
      return new ForbiddenError('target user cannot match logged user');
    }
    return this.addFilePermissionRepository
      .addFilePermission({ userId: targetUser.id, fileId: targetFile.id });
  }
}
