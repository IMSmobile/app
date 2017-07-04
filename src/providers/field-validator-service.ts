import { ValidatorFn, Validators, FormControl } from '@angular/forms';
import { MetadataField } from '../models/metadata-field';
import { IntegerValidator } from '../validators/integer-validator';
import { DoubleValidator } from '../validators/double-validator';
import { Injectable } from '@angular/core';

@Injectable()
export class FieldValidatorService {

  validationMessages: any = {
    'required': 'Feld muss zwingend ausgefüllt werden.',
    'not a number': 'Nur Zahlen erlaubt.',
    'not a whole number': 'Nur Ganzzahlen erlaubt.'
  };

  getValidatorFunctions(field: MetadataField): ValidatorFn[] {
    let validators: ValidatorFn[] = [];
    if (field.mandatory) {
      validators.push(Validators.required);
    }
    if (field.type === 'INTEGER') {
      validators.push(IntegerValidator.isValid);
    } else if (field.type === 'DOUBLE') {
      validators.push(DoubleValidator.isValid);
    }
    return validators;
  }

  getErrorMessage(formControl: FormControl): string {
    let errors: string[] = [];
    for (const key in formControl.errors) {
      errors.push(this.validationMessages[key]);
    }
    return errors.join(' ');
  }

}
