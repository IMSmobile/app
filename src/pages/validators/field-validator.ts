import { MetadataField } from './../../models/metadata-field';
import { IntegerValidator } from './integer-validator';
import { ValidatorFn, Validators, FormControl } from '@angular/forms';

export class FieldValidator {

  static validationMessages = {
    'required': 'Feld muss zwingend ausgefüllt werden.',
    'not a number': 'Nur Zahlen erlaubt.',
    'not a whole number': 'Nur Ganzzahlen erlaubt.'
  };

  static getValidatorFunctions(field: MetadataField): ValidatorFn[] {
    let validators: ValidatorFn[] = [];
    if (field.mandatory) {
      validators.push(Validators.required);
    }
    if (field.type === 'INTEGER') {
      validators.push(IntegerValidator.isValid);
    }
    return validators;
  }

  static getErrorMessage(formControl: FormControl): string {
    let errors: string[] = [];
    for (const key in formControl.errors) {
      errors.push(this.validationMessages[key]);
    }
    return errors.join(' ');
  }

}
