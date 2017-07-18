import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MetadataField } from '../models/metadata-field';
import { DoubleValidator } from '../validators/double-validator';
import { IntegerValidator } from '../validators/integer-validator';

@Injectable()
export class FieldValidatorService {

  // tslint:disable-next-line:no-any
  private validationMessages: any = {
    'required': 'Feld muss zwingend ausgefüllt werden.',
    'not a number': 'Nur Zahlen erlaubt.',
    'not a whole number': 'Nur Ganzzahlen erlaubt.'
  };

  public getValidatorFunctions(field: MetadataField): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
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

  public getErrorMessage(formControl: FormControl): string {
    const errors: string[] = [];
    for (const key in formControl.errors) {
      errors.push(this.validationMessages[key]);
    }
    return errors.join(' ');
  }

}
