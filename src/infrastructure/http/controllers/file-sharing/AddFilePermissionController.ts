import { Connection } from 'mysql2/promise';
import { makeAddFilePermissionRepository } from '../../../factories/repositories/AddFilePermissionRepositoryFactory';
import { AddFilePermission } from '../../../../application/use-cases/file-sharing/AddFilePermission';
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

export class AddFilePermissionController extends BaseController {
  constructor(
    private readonly addFilePermissionValidation: Validation,
    private readonly addFilePermission: AddFilePermission,
  ) {
    super(addFilePermissionValidation);
  }

  async execute(httpRequest: AddFilePermissionControllerRequest, connection: Connection):
  Promise<AddFilePermissionControllerResponse> {
    const { path } = httpRequest.params!;
    const { username } = httpRequest.body!;
    const userId = Number(httpRequest.userId!);
    this.addFilePermission.setupRuntimeDependencies(
      makeAddFilePermissionRepository(connection),
      makeGetFileByPathRepository(connection),
      makeGetUserByUsernameRepository(connection),
    );
    const result = await this.addFilePermission.execute({ path, username, loggedUserId: userId });
    if (result instanceof NoSuchFileError || result instanceof NoSuchUserError) {
      return notFound(result);
    }
    if (result instanceof ForbiddenError) {
      return forbidden(result);
    }
    return noContent();
  }
}

export type AddFilePermissionControllerRequest =
HttpRequest<{ username: string }, { path: string }>;
export type AddFilePermissionControllerResponse = HttpResponse;
