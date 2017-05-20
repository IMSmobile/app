import { FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

export class IntegerValidator {

  static isValid(control: FormControl): ValidationErrors | null {
    const name = control.value;
    if (isNaN(control.value)) {
      return { 'not a number': { name } };
    } else if (name % 1 !== 0) {
      return { 'not a whole number': { name } };
    } else {
      return null;
    }
  }
}
