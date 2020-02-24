import { FormGroup } from '@angular/forms';
export function SpinxValidImage(controlName: string,totalfiles:any) {
    return (formGroup: FormGroup) => 
    {
        const control = formGroup.controls[controlName];

          console.log('-------validaiton------control-------');
          console.log(control);
          console.log('-------validaiton------control---array----');
          console.log(totalfiles);


        // if (control.errors && !control.errors.spinxvalidNumeric) {
        //     return;
        // }

        //  if(control.value.match("^[0-9]*$"))
        //  {
        //     control.setErrors(null);
        //  }
        //  else{
        //     control.setErrors({ spinxvalidImage: 'Please Enter Only Numeric character' });
        //  }

    }
}

