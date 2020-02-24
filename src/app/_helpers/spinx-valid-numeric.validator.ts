import { FormGroup } from '@angular/forms';
export function SpinxValidNumeric(controlName: string) {
    return (formGroup: FormGroup) => 
    {
        const control = formGroup.controls[controlName];

        if (control.errors && !control.errors.spinxvalidNumeric) {
            return;
        }

         if(control.value.match("^[0-9]*$"))
         {
            control.setErrors(null);
         }
         else{
            control.setErrors({ spinxvalidNumeric: 'Please Enter Only Numeric character' });
         }

    }
}

