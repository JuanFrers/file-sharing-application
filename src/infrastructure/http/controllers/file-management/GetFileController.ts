import { Connection } from 'mysql2/promise';
import { Readable } from 'stream';
import { BaseController } from '../BaseController';
import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { Validation } from '../../interfaces/Validation';
import { GetFileContent } from '../../../../application/use-cases/file-management/GetFileContent';
import {
  forbidden, notFound, ok, serverError,
} from '../../helpers/http';
import { NoSuchFileError } from '../../../../application/errors/NoSuchFileError';
import { PermissionError } from '../../errors/PermissionError';
import { makeGetFileByPathRepository } from '../../../factories/repositories/GetFileByPathRepositoryFactory';
import { makeGetFilePermissionRepository } from '../../../factories/repositories/GetFilePermissionRepositoryFactory';

export class GetFileController extends BaseController {
  constructor(
    private readonly getFileValidation: Validation,
    private readonly getFileContent: GetFileContent,
  ) {
    super(getFileValidation);
  }

  async execute(httpRequest: GetFileControllerRequest, connection: Connection):
  Promise<GetFileControllerResponse> {
    const userId = Number(httpRequest.userId!);
    const { path } = httpRequest.params!;
    this.getFileContent.setupRuntimeDependencies(
      makeGetFileByPathRepository(connection),
      makeGetFilePermissionRepository(connection),
    );
    const result = await this.getFileContent.execute({ path, userId });

    if (result instanceof NoSuchFileError) {
      return notFound(result);
    }
    if (result instanceof PermissionError) {
      return forbidden(result);
    }
    if (result instanceof Error) {
      return serverError(result);
    }
    return ok(result.stream, { contentType: result.mimeType });
  }
}

export type GetFileControllerRequest = HttpRequest<void, { path: string }>;
export type GetFileControllerResponse = HttpResponse<Readable | Error>;
