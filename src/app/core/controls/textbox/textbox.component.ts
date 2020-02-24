import 
{
Component, 
OnInit,
Input,
EventEmitter,
Output,
ViewChild,
ElementRef,
} from '@angular/core';

import { Result } from "../../result.model";
import { FormGroup, FormBuilder,FormControl  } from '@angular/forms';

@Component({
    selector: 'spinx-textbox',
    templateUrl: 'textbox.component.html'
})

export class TextboxComponent implements OnInit {

@Input() manish_address: FormControl ;
@Input() id: string;
@Input() label: string;
@Input() name: string;
@Input() placeholder: string = null;
@Input() maxLength: number = null;


@Output() modelChange: EventEmitter<String> = new EventEmitter<String>();
@Input() model: string;

@ViewChild("control", { static: true }) control: ElementRef;




ngAfterViewInit() {
    // Adding placeholder
    if (this.placeholder != null)
      this.control.nativeElement.setAttribute(
        "placeholder",
        this.placeholder
      );

    // Max Length
    if (this.maxLength != null)
      this.control.nativeElement.setAttribute(
        "maxlength",
        this.maxLength
      );

       //console.log('----user-------');
      console.log(this.manish_address);    
  }

anyError() {
    //return this.result.errors.has(this.id);
}

getErrorMessage() {
    //return this.result.errors.get(this.id);
}  

constructor() { }

ngOnInit() { 

    
       
}



}