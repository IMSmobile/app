import { FieldValidator } from './field-validator';
import { IntegerValidator } from './integer-validator';
import { MetadataField } from './../../models/metadata-field';
import { Validators, FormControl } from '@angular/forms';

describe('Validator: Field Validator Provider', () => {

  it('should have integer and required validators for mandatory integer field', () => {
    let field = new MetadataField('integerFIeld', 'INTEGER', false, false, true, true, 100);
    expect(FieldValidator.getValidatorFunctions(field)).toContain(Validators.required);
    expect(FieldValidator.getValidatorFunctions(field)).toContain(IntegerValidator.isValid);
  });

  it('should have required but not integer validatorsfor mandatory string field', () => {
    let field = new MetadataField('integerFIeld', 'STRING', false, false, true, true, 100);
    expect(FieldValidator.getValidatorFunctions(field)).toContain(Validators.required);
    expect(FieldValidator.getValidatorFunctions(field)).not.toContain(IntegerValidator.isValid);
  });

  it('should have integer but not required validatorsfor integer  field', () => {
    let field = new MetadataField('integerFIeld', 'INTEGER', false, false, true, false, 100);
    expect(FieldValidator.getValidatorFunctions(field)).not.toContain(Validators.required);
    expect(FieldValidator.getValidatorFunctions(field)).toContain(IntegerValidator.isValid);
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
});
