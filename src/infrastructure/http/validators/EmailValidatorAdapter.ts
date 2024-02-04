import validator from 'validator';
import { EmailValidator } from '../validations/interfaces/EmailValidator';

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
