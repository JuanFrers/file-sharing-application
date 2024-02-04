import { Connection } from 'mysql2/promise';
import { makeListFilesRepository } from '../../../factories/repositories/ListFilesRepositoryFactory';
import { ListFiles } from '../../../../application/use-cases/file-management/ListFiles';
import { BaseController } from '../BaseController';
import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { Validation } from '../../interfaces/Validation';
import { ok } from '../../helpers/http';
import { ListFilesInterfaceResponse } from '../../../../application/interfaces/use-cases/file-management/ListFilesInterface';

export class ListFilesController extends BaseController {
  constructor(
    private readonly listFilesValidation: Validation,
    private readonly listFiles: ListFiles,
  ) {
    super(listFilesValidation);
  }

  async execute(httpRequest: ListFilesControllerRequest, connection: Connection):
  Promise<ListFilesControllerResponse> {
    const page = httpRequest.query!.page ? Number(httpRequest.query!.page) : undefined;
    const userId = Number(httpRequest.userId!);
    this.listFiles.setupRuntimeDependencies(makeListFilesRepository(connection));
    const res = await this.listFiles.execute({ page, userId });
    return ok(res);
  }
}

export type ListFilesControllerRequest = HttpRequest<void, { page?: number }>;
export type ListFilesControllerResponse = HttpResponse<ListFilesInterfaceResponse>;
