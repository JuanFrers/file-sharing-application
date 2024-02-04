import { AddFilePermission } from '../../../../application/use-cases/file-sharing/AddFilePermission';

export const makeAddFilePermission = (): AddFilePermission => {
  return new AddFilePermission();
};
