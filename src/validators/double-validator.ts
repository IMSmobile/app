import { FormControl, ValidationErrors } from '@angular/forms';

export class DoubleValidator {

  static isValid(control: FormControl): ValidationErrors | undefined {
    const name = control.value;
    if (isNaN(control.value)) {
      return { 'not a number': { name } };
    } else {
      return undefined;
    }
  }
}
