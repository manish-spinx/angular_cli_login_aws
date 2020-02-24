import { FormGroup } from '@angular/forms';


export function SpinxValidAlphabet(controlName: string) 
{
    return (formGroup: FormGroup) => 
    {
        const control = formGroup.controls[controlName];

        if (control.errors && !control.errors.spinxvalidAlphabet) {
            return;
        }

         if(!control.value.match("^[0-9]*$"))
         {
            control.setErrors(null);
         }
         else{
            control.setErrors({ spinxvalidAlphabet: true });
         }

    }
}

