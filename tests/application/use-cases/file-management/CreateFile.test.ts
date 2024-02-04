import { CreateFile } from '../../../../src/application/use-cases/file-management/CreateFile';
import { makeGetFileByPathRepository } from '../../../../src/infrastructure/factories/repositories/GetFileByPathRepositoryFactory';
import { GetFileByPathRepositoryInterface } from '../../../../src/domain/repositories/file-management/GetFileByPathRepositoryInterface';
import { createConnection } from '../../../../src/infrastructure/mysql/helpers/DbConnection';
import { makeCreateFileMetadataRepository } from '../../../../src/infrastructure/factories/repositories/CreateFileMetadataRepositoryFactory';
import { UploadFileRepository } from '../../../../src/infrastructure/mysql/repositories/file-management/UploadFileRepository';
import { CreateFileMetadataRepositoryInterface } from '../../../../src/domain/repositories/file-management/CreateFileMetadataRepositoryInterface';
import { FileAlreadyExistsError } from '../../../../src/application/errors/FileAlreadyExistsError';

jest.mock('../../../../src/infrastructure/mysql/helpers/DbConnection');

const uploadFileRepository = new UploadFileRepository();
const uploadFileRepositorySpy = jest.spyOn(uploadFileRepository, 'uploadFile').mockResolvedValue();
const createFile = new CreateFile(uploadFileRepository);

let createFileMetadataRepository: CreateFileMetadataRepositoryInterface;
let getFileByPathRepository: GetFileByPathRepositoryInterface;
let createFileMetadataRepositorySpy: jest.SpyInstance;
let getFileByPathRepositorySpy: jest.SpyInstance;
const useCaseInput = {
  userId: 1, path: 'some-path', username: 'username', payload: Buffer.from(''), size: 100, mimeType: 'application/pdf',
};
const expectedPath = `${useCaseInput.userId}/${useCaseInput.path}`;

describe('CreateFile', () => {
  beforeAll(async () => {
    const conn = await createConnection();
    createFileMetadataRepository = makeCreateFileMetadataRepository(conn);
    getFileByPathRepository = makeGetFileByPathRepository(conn);
    createFile.setupRuntimeDependencies(
      createFileMetadataRepository,
      getFileByPathRepository,
    );
    getFileByPathRepositorySpy = jest.spyOn(getFileByPathRepository, 'getFileByPath');
    createFileMetadataRepositorySpy = jest.spyOn(createFileMetadataRepository, 'createFileMetadata').mockResolvedValue();
  });

  it('should prepend user id to route', async () => {
    const fileData = {
      id: 10, path: useCaseInput.path, userId: useCaseInput.userId, createdAt: new Date(),
    };
    getFileByPathRepositorySpy.mockResolvedValueOnce(fileData);
    await createFile.execute(useCaseInput);
    expect(getFileByPathRepositorySpy).toHaveBeenCalledWith(expectedPath);
  });

  it('should return error if file exists', async () => {
    const fileData = {
      id: 1, path: useCaseInput.path, userId: useCaseInput.userId, createdAt: new Date(),
    };
    getFileByPathRepositorySpy.mockResolvedValueOnce(fileData);
    const result = await createFile.execute(useCaseInput);
    expect(result).toEqual(new FileAlreadyExistsError());
  });

  it('should upload and create file metadata', async () => {
    getFileByPathRepositorySpy.mockResolvedValueOnce(null);
    await createFile.execute(useCaseInput);
    expect(uploadFileRepositorySpy).toHaveBeenCalledWith({ ...useCaseInput, path: expectedPath });
    expect(createFileMetadataRepositorySpy).toHaveBeenCalledWith(
      {
        path: expectedPath,
        size: useCaseInput.size,
        userId: useCaseInput.userId,
      },
    );
  });
});
