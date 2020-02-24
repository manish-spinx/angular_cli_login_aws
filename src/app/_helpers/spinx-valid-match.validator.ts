import { FormGroup } from '@angular/forms';
export function SpinxValidMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.spinxvalidMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ spinxvalidMatch: 'Please Password Matched !' });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

