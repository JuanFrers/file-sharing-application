import { ValidationComposite } from '../../../http/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../../http/validations/RequiredFieldValidation';

export const makeCreateFileValidation = (): ValidationComposite => new ValidationComposite([
  new RequiredFieldValidation('file'),
], 'files');
