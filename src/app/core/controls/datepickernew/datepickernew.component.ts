import {Component, Input, Optional, Self,forwardRef} from "@angular/core";
import {ControlValueAccessor, NgControl,NG_VALUE_ACCESSOR} from "@angular/forms";
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
    selector: 'app-custom-datepicker',
    templateUrl: 'datepickernew.component.html',
})
export class DatePickerNewComponent implements ControlValueAccessor {

    @Input() public label: string;
    @Input() public id: string;
    @Input() public type:string;
    @Input() public placeholder: string;
    @Input() public required = false;
    @Input() public disabled = false;
    @Input() public data: string;
    @Input() public pattern:string;
    @Input() public customMsg:string; 
    @Input() public submit_validaiton_flag:boolean = false; 
      
    
    private errorMessages = new Map<string, () => string>();

    public onChangeFn = (_: any) => {};

    public onTouchedFn = () => {};

    constructor(@Self() @Optional() public control: NgControl) {
        this.control && (this.control.valueAccessor = this);
        this.errorMessages.set('required', () => `${this.label} is required.`);      
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