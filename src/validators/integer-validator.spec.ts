import { FormControl } from '@angular/forms';
import { IntegerValidator } from './integer-validator';

describe('Validator: Integer Validator', () => {

  it('should have no error on valid integer', () => {
    expect(IntegerValidator.isValid(new FormControl('1'))).toBeUndefined();
  });

  it('should have an error on floating number', () => {
    const validationError = { 'not a whole number': { name: '1.1' } };
    expect(IntegerValidator.isValid(new FormControl('1.1'))).toEqual(validationError);
  });

  it('should have an error on alphanumeric character', () => {
    const validationError = { 'not a number': { name: 'a' } };
    expect(IntegerValidator.isValid(new FormControl('a'))).toEqual(validationError);
  });
});
