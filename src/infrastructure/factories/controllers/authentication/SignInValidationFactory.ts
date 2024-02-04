import { ValidationComposite } from '../../../http/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../../http/validations/RequiredFieldValidation';

export const makeSignInValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldValidation('username'),
    new RequiredFieldValidation('password'),
  ], 'body');
};
