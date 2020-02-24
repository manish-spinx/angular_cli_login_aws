import { Component, OnInit,Input, Optional, Self } from '@angular/core';
import {ControlValueAccessor, NgControl,NG_VALUE_ACCESSOR} from "@angular/forms";


@Component({
    selector: 'spinx-radio',
    templateUrl: 'radiobutton.component.html'
})

export class RadioButtonComponent implements ControlValueAccessor {

    
    @Input() public label: string;
    @Input() public id: string;
    @Input() public name: string;    
    @Input() public submit_validaiton_flag:boolean = false; 
    @Input() public genders_custom:any;
    @Input() public data: string;

    @Input() public disabled = false;

    private errorMessages = new Map<string, () => string>();
    public onChangeFn = (_: any) => {};
    public onTouchedFn = () => {};
    

    constructor(@Self() @Optional() public control: NgControl) {
        this.control && (this.control.valueAccessor = this);
        this.errorMessages.set('required', () => `${this.label} field is required.`);
    }

    public get invalid(): boolean {
        return this.control ? this.control.invalid : false;
    }

    public get showError(): boolean {

        if (!this.control) {
            return false;
        }
        const { dirty, touched} = this.control;
        return this.invalid ? (dirty || touched) : false;
    }

    public get errors(): Array<string> {

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
         this.onChangeFn = fn;
     }
 
     public registerOnTouched(fn: any): void {
         this.onTouchedFn = fn;
     }
 
     public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
     }
 
     public writeValue(obj: any): void {
         this.data = obj;
     }
 
     public onChange() {
         this.onChangeFn(this.data);
     }
}