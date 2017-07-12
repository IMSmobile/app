import { FormControl, ValidationErrors } from '@angular/forms';

export class DoubleValidator {

  public static isValid(control: FormControl): ValidationErrors | null {
    const name = control.value;
    if (isNaN(control.value)) {
      return { 'not a number': { name } };
    } else {
      return null;
    }
  }
}
