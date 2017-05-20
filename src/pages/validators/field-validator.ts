import { MetadataField } from './../../models/metadata-field';
import { Injectable } from '@angular/core';
import { IntegerValidator } from './integer-validator';
import { ValidatorFn, ValidationErrors, Validators } from '@angular/forms';

export class FieldValidator {

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

}