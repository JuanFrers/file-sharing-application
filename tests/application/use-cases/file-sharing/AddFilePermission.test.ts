import { AddFilePermission } from '../../../../src/application/use-cases/file-sharing/AddFilePermission';
import { makeAddFilePermissionRepository } from '../../../../src/infrastructure/factories/repositories/AddFilePermissionRepositoryFactory';
import { makeGetFileByPathRepository } from '../../../../src/infrastructure/factories/repositories/GetFileByPathRepositoryFactory';
import { makeGetUserByUsernameRepository } from '../../../../src/infrastructure/factories/repositories/GetUserByUsernameRepositoryFactory';
import { NoSuchFileError } from '../../../../src/application/errors/NoSuchFileError';
import { GetFileByPathRepositoryInterface } from '../../../../src/domain/repositories/file-management/GetFileByPathRepositoryInterface';
import { AddFilePermissionRepositoryInterface } from '../../../../src/domain/repositories/file-sharing/AddFilePermissionRepositoryInterface';
import { GetUserByUsernameRepositoryInterface } from '../../../../src/domain/repositories/authentication/GetUserByUsernameRepositoryInterface';
import { ForbiddenError } from '../../../../src/application/errors/ForbiddenError';
import { NoSuchUserError } from '../../../../src/application/errors/NoSuchUserError';
import { UserEntityProps } from '../../../../src/domain/UserEntityProps';
import { createConnection } from '../../../../src/infrastructure/mysql/helpers/DbConnection';

jest.mock('../../../../src/infrastructure/mysql/helpers/DbConnection');

const addFilePermission = new AddFilePermission();
let addFilePermissionRepository: AddFilePermissionRepositoryInterface;
let getFileByPathRepository: GetFileByPathRepositoryInterface;
let getUserByUsernameRepository: GetUserByUsernameRepositoryInterface;
let getFileByPathRepositorySpy: jest.SpyInstance;
let getUserByUsernameRepositorySpy: jest.SpyInstance;
let addFilePermissionSpy: jest.SpyInstance;
const useCaseInput = { loggedUserId: 1, path: 'some-path', username: 'username' };

describe('AddFilePermission', () => {
  beforeAll(async () => {
    const conn = await createConnection();
    addFilePermissionRepository = makeAddFilePermissionRepository(conn);
    getFileByPathRepository = makeGetFileByPathRepository(conn);
    getUserByUsernameRepository = makeGetUserByUsernameRepository(conn);
    addFilePermission.setupRuntimeDependencies(
      addFilePermissionRepository,
      getFileByPathRepository,
      getUserByUsernameRepository,
    );
    getFileByPathRepositorySpy = jest.spyOn(getFileByPathRepository, 'getFileByPath');
    getUserByUsernameRepositorySpy = jest.spyOn(getUserByUsernameRepository, 'getUserByUsername');
    addFilePermissionSpy = jest.spyOn(addFilePermissionRepository, 'addFilePermission');
  });

  it('should return error on file not found', async () => {
    getFileByPathRepositorySpy.mockResolvedValueOnce(null);
    const result = await addFilePermission.execute(useCaseInput);
    expect(getFileByPathRepositorySpy).toHaveBeenCalledWith(useCaseInput.path);
    expect(result).toEqual(new NoSuchFileError());
  });

  it('should return error when permission assigner does not own the file', async () => {
    const fileData = {
      id: 1, path: useCaseInput.path, userId: 2, createdAt: new Date(),
    };
    getFileByPathRepositorySpy.mockResolvedValueOnce(fileData);
    const result = await addFilePermission.execute(useCaseInput);
    expect(result).toEqual(new ForbiddenError('file not owned'));
  });

  it('should return error when target user does not exist', async () => {
    const fileData = {
      id: 1, path: useCaseInput.path, userId: useCaseInput.loggedUserId, createdAt: new Date(),
    };
    getFileByPathRepositorySpy.mockResolvedValueOnce(fileData);
    getUserByUsernameRepositorySpy.mockResolvedValueOnce(null);
    const result = await addFilePermission.execute(useCaseInput);
    expect(getUserByUsernameRepositorySpy).toHaveBeenCalledWith(useCaseInput.username);
    expect(result).toEqual(new NoSuchUserError());
  });

  it('should return error when target user matches owner user', async () => {
    const fileData = {
      id: 1, path: useCaseInput.path, userId: useCaseInput.loggedUserId, createdAt: new Date(),
    };
    const userData: UserEntityProps = {
      id: useCaseInput.loggedUserId, username: useCaseInput.username, name: 'some name', email: 'user@example.com', password: 'some password', createdAt: new Date(),
    };
    getFileByPathRepositorySpy.mockResolvedValueOnce(fileData);
    getUserByUsernameRepositorySpy.mockResolvedValueOnce(userData);
    const result = await addFilePermission.execute(useCaseInput);
    expect(getUserByUsernameRepositorySpy).toHaveBeenCalledWith(useCaseInput.username);
    expect(result).toEqual(new ForbiddenError('target user cannot match logged user'));
  });

  it('should add file permission on proper scenario', async () => {
    const fileData = {
      id: 1, path: useCaseInput.path, userId: useCaseInput.loggedUserId, createdAt: new Date(),
    };
    const userData: UserEntityProps = {
      id: 2, username: useCaseInput.username, name: 'some name', email: 'user@example.com', password: 'some password', createdAt: new Date(),
    };
    getFileByPathRepositorySpy.mockResolvedValueOnce(fileData);
    getUserByUsernameRepositorySpy.mockResolvedValueOnce(userData);
    addFilePermissionSpy.mockReturnThis();
    await addFilePermission.execute(useCaseInput);
    expect(addFilePermissionSpy).toHaveBeenCalledWith({ userId: userData.id, fileId: fileData.id });
  });
});
