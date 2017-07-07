import { FormControl, Validators } from '@angular/forms';
import { MetadataField } from './../models/metadata-field';
import { DoubleValidator } from './../validators/double-validator';
import { IntegerValidator } from './../validators/integer-validator';
import { FieldValidatorService } from './field-validator-service';

describe('Validator: Field Validator Provider', () => {

  let fieldValidator;
  const fieldLength: number = 100;

  beforeEach(() => {
    fieldValidator = new FieldValidatorService();
  });

  it('should only have required validator for mandatory string field', () => {
    const field = new MetadataField('mandatoryStringField', 'STRING', false, false, true, true, fieldLength);
    expect(fieldValidator.getValidatorFunctions(field)).toContain(Validators.required);
    expect(fieldValidator.getValidatorFunctions(field)).not.toContain(IntegerValidator.isValid);
    expect(fieldValidator.getValidatorFunctions(field)).not.toContain(DoubleValidator.isValid);
  });

  it('should have integer and required validators for mandatory integer field', () => {
    const field = new MetadataField('mandatoryIntegerField', 'INTEGER', false, false, true, true, fieldLength);
    expect(fieldValidator.getValidatorFunctions(field)).toContain(Validators.required);
    expect(fieldValidator.getValidatorFunctions(field)).toContain(IntegerValidator.isValid);
    expect(fieldValidator.getValidatorFunctions(field)).not.toContain(DoubleValidator.isValid);
  });

  it('should have double and required validators for mandatory double field', () => {
    const field = new MetadataField('mandatoryDoubleField', 'DOUBLE', false, false, true, true, fieldLength);
    expect(fieldValidator.getValidatorFunctions(field)).toContain(Validators.required);
    expect(fieldValidator.getValidatorFunctions(field)).not.toContain(IntegerValidator.isValid);
    expect(fieldValidator.getValidatorFunctions(field)).toContain(DoubleValidator.isValid);
  });

  it('should have no validators for optional string field', () => {
    const field = new MetadataField('optionalStringField', 'STRING', false, false, true, false, fieldLength);
    expect(fieldValidator.getValidatorFunctions(field)).not.toContain(Validators.required);
    expect(fieldValidator.getValidatorFunctions(field)).not.toContain(IntegerValidator.isValid);
    expect(fieldValidator.getValidatorFunctions(field)).not.toContain(DoubleValidator.isValid);
  });

  it('should only have integer validator for optional integer field', () => {
    const field = new MetadataField('optionalIntegerField', 'INTEGER', false, false, true, false, fieldLength);
    expect(fieldValidator.getValidatorFunctions(field)).not.toContain(Validators.required);
    expect(fieldValidator.getValidatorFunctions(field)).toContain(IntegerValidator.isValid);
    expect(fieldValidator.getValidatorFunctions(field)).not.toContain(DoubleValidator.isValid);
  });

  it('should only have double validator for optional double field', () => {
    const field = new MetadataField('optionalDoubleField', 'DOUBLE', false, false, true, false, fieldLength);
    expect(fieldValidator.getValidatorFunctions(field)).not.toContain(Validators.required);
    expect(fieldValidator.getValidatorFunctions(field)).not.toContain(IntegerValidator.isValid);
    expect(fieldValidator.getValidatorFunctions(field)).toContain(DoubleValidator.isValid);
  });

  it('should have no error message from valid formcontrol', () => {
    const formControl = new FormControl('value', Validators.required);
    expect(fieldValidator.getErrorMessage(formControl)).toEqual('');
  });

  it('should have error message required from failed formcontrol', () => {
    const formControl = new FormControl('', Validators.required);
    expect(fieldValidator.getErrorMessage(formControl)).toEqual('Feld muss zwingend ausgefüllt werden.');
  });

  it('should have error message not a number from failed formcontrol', () => {
    const formControl = new FormControl('12a', IntegerValidator.isValid);
    expect(fieldValidator.getErrorMessage(formControl)).toEqual('Nur Zahlen erlaubt.');
  });

  it('should have error message not a floating number from failed formcontrol', () => {
    const formControl = new FormControl('3.14', IntegerValidator.isValid);
    expect(fieldValidator.getErrorMessage(formControl)).toEqual('Nur Ganzzahlen erlaubt.');
  });

  it('should have error message not a number from failed double formcontrol', () => {
    const formControl = new FormControl('12a', DoubleValidator.isValid);
    expect(fieldValidator.getErrorMessage(formControl)).toEqual('Nur Zahlen erlaubt.');
  });

});
