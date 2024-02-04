import { ListFilesInterface, ListFilesInterfaceRequest, ListFilesInterfaceResponse } from '../../interfaces/use-cases/file-management/ListFilesInterface';
import { ListFilesRepositoryInterface } from '../../../domain/repositories/file-management/ListFilesRepositoryInterface';

export class ListFiles implements ListFilesInterface {
  private listFilesRepository: ListFilesRepositoryInterface | undefined;

  setupRuntimeDependencies(listFilesRepository: ListFilesRepositoryInterface): void {
    this.listFilesRepository = listFilesRepository;
  }

  async execute(fileData: ListFilesInterfaceRequest): Promise<ListFilesInterfaceResponse> {
    if (!this.listFilesRepository) {
      throw new Error();
    }
    const res = await this.listFilesRepository.listFiles(fileData);
    return res.map((r) => ({ ...r, size: `${(r.size / 1024 / 1024).toFixed(2)} MB` }));
  }
}
