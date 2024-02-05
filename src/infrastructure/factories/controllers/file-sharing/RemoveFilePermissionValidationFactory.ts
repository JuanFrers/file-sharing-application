import { ValidationComposite } from '../../../http/validations/ValidationComposite';

export const makeRemoveFilePermissionValidation = ():
ValidationComposite => new ValidationComposite([], '');
