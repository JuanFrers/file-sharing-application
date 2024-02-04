import { ValidationComposite } from '../../../http/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../../http/validations/RequiredFieldValidation';
import { EmailValidation } from '../../../http/validations/EmailValidation';
import { EmailValidatorAdapter } from '../../../http/validators/EmailValidatorAdapter';

export const makeSignUpValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter();
  return new ValidationComposite([
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('username'),
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new EmailValidation('email', emailValidator),
  ], 'body');
};
