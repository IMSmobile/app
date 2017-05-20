import { FieldValidator } from './field-validator';
import { IntegerValidator } from './integer-validator';
import { MetadataField } from './../../models/metadata-field';
import { Validators } from '@angular/forms';

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
});
