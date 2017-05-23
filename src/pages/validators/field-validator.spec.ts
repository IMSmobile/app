import { FieldValidator } from './field-validator';
import { IntegerValidator } from './integer-validator';
import { DoubleValidator } from './double-validator';
import { MetadataField } from './../../models/metadata-field';
import { Validators, FormControl } from '@angular/forms';

describe('Validator: Field Validator Provider', () => {

  it('should only have required validator for mandatory string field', () => {
    let field = new MetadataField('mandatoryStringField', 'STRING', false, false, true, true, 100);
    expect(FieldValidator.getValidatorFunctions(field)).toContain(Validators.required);
    expect(FieldValidator.getValidatorFunctions(field)).not.toContain(IntegerValidator.isValid);
    expect(FieldValidator.getValidatorFunctions(field)).not.toContain(DoubleValidator.isValid);
  });

  it('should have integer and required validators for mandatory integer field', () => {
    let field = new MetadataField('mandatoryIntegerField', 'INTEGER', false, false, true, true, 100);
    expect(FieldValidator.getValidatorFunctions(field)).toContain(Validators.required);
    expect(FieldValidator.getValidatorFunctions(field)).toContain(IntegerValidator.isValid);
    expect(FieldValidator.getValidatorFunctions(field)).not.toContain(DoubleValidator.isValid);
  });

  it('should have double and required validators for mandatory double field', () => {
    let field = new MetadataField('mandatoryDoubleField', 'DOUBLE', false, false, true, true, 100);
    expect(FieldValidator.getValidatorFunctions(field)).toContain(Validators.required);
    expect(FieldValidator.getValidatorFunctions(field)).not.toContain(IntegerValidator.isValid);
    expect(FieldValidator.getValidatorFunctions(field)).toContain(DoubleValidator.isValid);
  });

  it('should have no validators for optional string field', () => {
    let field = new MetadataField('optionalStringField', 'STRING', false, false, true, false, 100);
    expect(FieldValidator.getValidatorFunctions(field)).not.toContain(Validators.required);
    expect(FieldValidator.getValidatorFunctions(field)).not.toContain(IntegerValidator.isValid);
    expect(FieldValidator.getValidatorFunctions(field)).not.toContain(DoubleValidator.isValid);
  });

  it('should only have integer validator for optional integer field', () => {
    let field = new MetadataField('optionalIntegerField', 'INTEGER', false, false, true, false, 100);
    expect(FieldValidator.getValidatorFunctions(field)).not.toContain(Validators.required);
    expect(FieldValidator.getValidatorFunctions(field)).toContain(IntegerValidator.isValid);
    expect(FieldValidator.getValidatorFunctions(field)).not.toContain(DoubleValidator.isValid);
  });

  it('should only have double validator for optional double field', () => {
    let field = new MetadataField('optionalDoubleField', 'DOUBLE', false, false, true, false, 100);
    expect(FieldValidator.getValidatorFunctions(field)).not.toContain(Validators.required);
    expect(FieldValidator.getValidatorFunctions(field)).not.toContain(IntegerValidator.isValid);
    expect(FieldValidator.getValidatorFunctions(field)).toContain(DoubleValidator.isValid);
  });

  it('should have no error message from valid formcontrol', () => {
    let formControl = new FormControl('value', Validators.required);
    expect(FieldValidator.getErrorMessage(formControl)).toEqual('');
  });

  it('should have error message required from failed formcontrol', () => {
    let formControl = new FormControl('', Validators.required);
    expect(FieldValidator.getErrorMessage(formControl)).toEqual('Feld muss zwingend ausgefüllt werden.');
  });

  it('should have error message not a number from failed formcontrol', () => {
    let formControl = new FormControl('12a', IntegerValidator.isValid);
    expect(FieldValidator.getErrorMessage(formControl)).toEqual('Nur Zahlen erlaubt.');
  });

  it('should have error message not a floating number from failed formcontrol', () => {
    let formControl = new FormControl('3.14', IntegerValidator.isValid);
    expect(FieldValidator.getErrorMessage(formControl)).toEqual('Nur Ganzzahlen erlaubt.');
  });

  it('should have error message not a number from failed double formcontrol', () => {
    let formControl = new FormControl('12a', DoubleValidator.isValid);
    expect(FieldValidator.getErrorMessage(formControl)).toEqual('Nur Zahlen erlaubt.');
  });

});
