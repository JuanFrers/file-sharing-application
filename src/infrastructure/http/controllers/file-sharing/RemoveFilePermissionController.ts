import { Connection } from 'mysql2/promise';
import { makeRemoveFilePermissionRepository } from '../../../factories/repositories/RemoveFilePermissionRepositoryFactory';
import { RemoveFilePermission } from '../../../../application/use-cases/file-sharing/RemoveFilePermission';
import { BaseController } from '../BaseController';
import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { Validation } from '../../interfaces/Validation';
import { forbidden, noContent, notFound } from '../../helpers/http';
import { makeGetFileByPathRepository } from '../../../factories/repositories/GetFileByPathRepositoryFactory';
import { makeGetUserByUsernameRepository } from '../../../factories/repositories/GetUserByUsernameRepositoryFactory';
import { NoSuchUserError } from '../../../../application/errors/NoSuchUserError';
import { NoSuchFileError } from '../../../../application/errors/NoSuchFileError';
import { ForbiddenError } from '../../../../application/errors/ForbiddenError';

export class RemoveFilePermissionController extends BaseController {
  constructor(
    private readonly removeFilePermissionValidation: Validation,
    private readonly removeFilePermission: RemoveFilePermission,
  ) {
    super(removeFilePermissionValidation);
  }

  async execute(httpRequest: RemoveFilePermissionControllerRequest, connection: Connection):
  Promise<RemoveFilePermissionControllerResponse> {
    const { path, username } = httpRequest.params!;
    const userId = Number(httpRequest.userId!);
    this.removeFilePermission.setupRuntimeDependencies(
      makeRemoveFilePermissionRepository(connection),
      makeGetFileByPathRepository(connection),
      makeGetUserByUsernameRepository(connection),
    );
    const result = await this.removeFilePermission
      .execute({ path, username, loggedUserId: userId });
    if (result instanceof NoSuchFileError || result instanceof NoSuchUserError) {
      return notFound(result);
    }
    if (result instanceof ForbiddenError) {
      return forbidden(result);
    }
    return noContent();
  }
}

export type RemoveFilePermissionControllerRequest =
HttpRequest<void, { path: string, username: string }>;
export type RemoveFilePermissionControllerResponse = HttpResponse;
