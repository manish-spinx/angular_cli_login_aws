import {Component, Input, Optional, Self,forwardRef} from "@angular/core";
import {ControlValueAccessor, NgControl,NG_VALUE_ACCESSOR} from "@angular/forms";


@Component({
    selector: 'app-custom-textbox',
    templateUrl: 'custom-textbox.component.html',
    // providers: [
    //     {
    //       provide: NG_VALUE_ACCESSOR,
    //       useExisting: forwardRef(() => CustomTextboxComponent),
    //       multi: true
    //     }
    //   ]
})
export class CustomTextboxComponent implements ControlValueAccessor {

    @Input() public label: string;
    @Input() public id: string;
    @Input() public type:string;
    @Input() public placeholder: string;
    @Input() public required = false;
    @Input() public disabled = false;
    @Input() public data: string;
    @Input() public minlength = 0;
    @Input() public maxlength:number = null;
    @Input() public pattern:string;
    @Input() public customMsg:string; 
    @Input() public submit_validaiton_flag:boolean = false; 
      
    
    private errorMessages = new Map<string, () => string>();

    public onChangeFn = (_: any) => {

        //console.log('----------onChangeFn-------------');

    };

    public onTouchedFn = () => {};

    constructor(@Self() @Optional() public control: NgControl) {
        //console.log('----------constructor-------------');
        this.control && (this.control.valueAccessor = this);

        this.errorMessages.set('required', () => `${this.label} is required.`);
        this.errorMessages.set('minlength', () => `The no. of characters should not be less than ${this.minlength}.`);
        this.errorMessages.set('maxlength', () => `The no. of characters should not be greater than ${this.maxlength}.`);
        this.errorMessages.set('pattern', () => `Please Enter Valid Email Id`);
        //this.errorMessages.set('spinxvalidMatch', () => `Please Password Matched !`);
        //this.errorMessages.set('spinxvalidNumeric', () => `Please Enter Only Numeric character`);
        this.errorMessages.set('spinxvalidAlphabet', () => `Please Enter Only Alphabet character`);
        
    }

    public get invalid(): boolean {
        //console.log('----------invalid-------------');        
        return this.control ? this.control.invalid : false;
    }

    public get showError(): boolean {

        //console.log('----------showError-------------');

        if (!this.control) {
            return false;
        }

        const { dirty, touched} = this.control;
        return this.invalid ? (dirty || touched) : false;
    }

    public get errors(): Array<string> {

       // console.log('----------errors-------------');

        if (!this.control) {
            return [];
        }
        const { errors } = this.control;

        if(errors!=null)
        {
            return Object.keys(errors).map(key => this.errorMessages.has(key) ? this.errorMessages.get(key)() : <string>errors[key] || key);
        }
        else{
            return [];
        }
    }

    public registerOnChange(fn: any): void {        
       // console.log('----------registerOnChange-------------');                
        this.onChangeFn = fn;
    }

    public registerOnTouched(fn: any): void {
        //console.log('----------registerOnTouched-------------');
        this.onTouchedFn = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
       // console.log('----------setDisabledState-------------');
        this.disabled = isDisabled;
    }

    public writeValue(obj: any): void {
        //console.log('----------writeValue-------------');
        this.data = obj;
    }

    public onChange() {
        //console.log('----------onChange-------------');
        this.onChangeFn(this.data);
    }
}