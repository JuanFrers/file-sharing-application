import { Connection } from 'mysql2/promise';
import { UploadedFile } from 'express-fileupload';
import { CreateFileInterfaceRequest } from '../../../../application/interfaces/use-cases/file-management/CreateFileInterface';
import { makeCreateFileMetadataRepository } from '../../../factories/repositories/CreateFileMetadataRepositoryFactory';
import { CreateFile } from '../../../../application/use-cases/file-management/CreateFile';
import { BaseController } from '../BaseController';
import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { Validation } from '../../interfaces/Validation';
import { forbidden, noContent } from '../../helpers/http';
import { makeGetFileByPathRepository } from '../../../factories/repositories/GetFileByPathRepositoryFactory';
import { FileAlreadyExistsError } from '../../../../application/errors/FileAlreadyExistsError';

export class CreateFileController extends BaseController {
  constructor(
    private readonly createFileValidation: Validation,
    private readonly createFile: CreateFile,
  ) {
    super(createFileValidation);
  }

  async execute(httpRequest: CreateFileControllerRequest, connection: Connection):
  Promise<CreateFileControllerResponse> {
    const userId = Number(httpRequest.userId!);
    const {
      name, data, size, mimetype,
    } = httpRequest.files!.file as UploadedFile;
    this.createFile.setupRuntimeDependencies(
      makeCreateFileMetadataRepository(connection),
      makeGetFileByPathRepository(connection),
    );
    const result = await this.createFile.execute({
      payload: data, userId, path: name, size, mimeType: mimetype,
    });
    if (result instanceof FileAlreadyExistsError) {
      return forbidden(result);
    }
    return noContent();
  }
}

export type CreateFileControllerRequest = HttpRequest<CreateFileInterfaceRequest>;
export type CreateFileControllerResponse = HttpResponse<FileAlreadyExistsError>;
