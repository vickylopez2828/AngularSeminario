import { FormGroup, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export const checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control instanceof FormGroup) {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        return password?.value === confirmPassword?.value
            ? null
            : { 'passwordsNotEquals': true };
    }
    return null;
}