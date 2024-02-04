import { ValidationComposite } from '../../../http/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../../http/validations/RequiredFieldValidation';

export const makeAddFilePermissionValidation = (): ValidationComposite => new ValidationComposite([
  new RequiredFieldValidation('username'),
], 'body');
