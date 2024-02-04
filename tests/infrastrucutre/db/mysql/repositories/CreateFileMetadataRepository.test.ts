import { Connection } from 'mysql2/promise';
import { makeCreateFileMetadataRepository } from '../../../../../src/infrastructure/factories/repositories/CreateFileMetadataRepositoryFactory';
import { createConnection } from '../../../../../src/infrastructure/mysql/helpers/DbConnection';
import { CreateFileMetadataRepositoryInterface } from '../../../../../src/domain/repositories/file-management/CreateFileMetadataRepositoryInterface';

jest.mock('../../../../../src/infrastructure/mysql/helpers/DbConnection', () => ({
  createConnection: async (): Promise<Connection> => ({
    query: (): void => {
    },
  } as unknown as Connection),
}));

let querySpy: jest.SpyInstance;
let createFileMetadataRepository: CreateFileMetadataRepositoryInterface;

describe('CreateFileMetadataRepository', () => {
  beforeEach(async () => {
    const connection = await createConnection();
    querySpy = jest.spyOn(connection, 'query');
    createFileMetadataRepository = makeCreateFileMetadataRepository(connection);
  });

  const args = { userId: 10, path: 'some-file.txt', size: 123 };

  it('should handle parameters correctly', async () => {
    await createFileMetadataRepository.createFileMetadata(args);
    expect(querySpy.mock.calls[0][1]).toEqual([args.path, args.size]);
    expect(querySpy.mock.calls[1][1]).toEqual([args.userId]);
  });
});
