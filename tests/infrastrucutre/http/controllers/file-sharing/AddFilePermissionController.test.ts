import { AddFilePermissionController, AddFilePermissionControllerRequest } from '../../../../../src/infrastructure/http/controllers/file-sharing/AddFilePermissionController';
import { makeAddFilePermissionValidation } from '../../../../../src/infrastructure/factories/controllers/file-sharing/AddFilePermissionValidationFactory';
import { makeAddFilePermission } from '../../../../../src/infrastructure/factories/use-cases/file-sharing/AddFilePermissionFactory';
import { createConnection } from '../../../../../src/infrastructure/mysql/helpers/DbConnection';
import { forbidden, noContent, notFound } from '../../../../../src/infrastructure/http/helpers/http';
import { NoSuchFileError } from '../../../../../src/application/errors/NoSuchFileError';
import { ForbiddenError } from '../../../../../src/application/errors/ForbiddenError';

jest.mock('../../../../../src/infrastructure/mysql/helpers/DbConnection');

const addFilePermissionValidation = makeAddFilePermissionValidation();
const addFilePermission = makeAddFilePermission();
const addFilePermissionController = new AddFilePermissionController(
  addFilePermissionValidation,
  addFilePermission,
);
const request: AddFilePermissionControllerRequest = {
  userId: '1',
  body: { username: 'username' },
  params: { path: '/some-path' },
};

describe('AddFilePermissionController', () => {
  it('should call AddFilePermission with correct params', async () => {
    const addFilePermissionSpy = jest.spyOn(addFilePermission, 'execute').mockResolvedValue();
    await addFilePermissionController.execute(request, await createConnection());
    expect(addFilePermissionSpy)
      .toHaveBeenCalledWith({
        loggedUserId: Number(request.userId),
        ...request.body,
        ...request.params,
      });
  });

  it('should return 204 on success', async () => {
    jest.spyOn(addFilePermission, 'execute').mockResolvedValue();
    const httpResponse = await addFilePermissionController
      .execute(request, await createConnection());
    expect(httpResponse).toEqual(noContent());
  });

  it('should return 404 on file not found', async () => {
    const error = new NoSuchFileError();
    jest.spyOn(addFilePermission, 'execute').mockResolvedValue(error);
    const httpResponse = await addFilePermissionController
      .execute(request, await createConnection());
    expect(httpResponse).toEqual(notFound(error));
  });

  it('should return 403 on forbidden error', async () => {
    const error = new ForbiddenError();
    jest.spyOn(addFilePermission, 'execute').mockResolvedValue(error);
    const httpResponse = await addFilePermissionController
      .execute(request, await createConnection());
    expect(httpResponse).toEqual(forbidden(error));
  });
});
