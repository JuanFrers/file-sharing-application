import { Connection } from 'mysql2/promise';
import { makeRemoveFileMetadataRepository } from '../../../factories/repositories/RemoveFileMetadataRepositoryFactory';
import { RemoveFile } from '../../../../application/use-cases/file-management/RemoveFile';
import { BaseController } from '../BaseController';
import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { Validation } from '../../interfaces/Validation';
import { forbidden, noContent, notFound } from '../../helpers/http';
import { makeGetFileByPathRepository } from '../../../factories/repositories/GetFileByPathRepositoryFactory';
import { NoSuchFileError } from '../../../../application/errors/NoSuchFileError';
import { ForbiddenError } from '../../../../application/errors/ForbiddenError';

export class RemoveFileController extends BaseController {
  constructor(
    private readonly removeFileValidation: Validation,
    private readonly removeFile: RemoveFile,
  ) {
    super(removeFileValidation);
  }

  async execute(httpRequest: RemoveFileControllerRequest, connection: Connection):
  Promise<RemoveFileControllerResponse> {
    const userId = Number(httpRequest.userId!);
    const { path } = httpRequest.params!;
    this.removeFile.setupRuntimeDependencies(
      makeRemoveFileMetadataRepository(connection),
      makeGetFileByPathRepository(connection),
    );
    const result = await this.removeFile.execute({ path, userId });
    if (result instanceof NoSuchFileError) {
      return notFound(result);
    }
    if (result instanceof ForbiddenError) {
      return forbidden(result);
    }
    return noContent();
  }
}

export type RemoveFileControllerRequest = HttpRequest<void, { path: string }>;
export type RemoveFileControllerResponse = HttpResponse;
