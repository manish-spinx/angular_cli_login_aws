import { Component,OnInit,Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'spinx-checkbox',
    templateUrl: 'checkbox.component.html'
})

export class checkboxComponent implements OnInit {

    @Input() public label: string;
    @Input() public class: string;
    @Input() public id: string;
    @Input() public name: string;
    @Input() public record_list:any;
    @Input() public submit_validaiton_flag:boolean = false; 
    @Input() public selected_record_list:string[]=[]; 
    

    @Output() onClick = new EventEmitter<any>();


    constructor() { }

    ngOnInit() { }

    onClickButton(event) {
        this.onClick.emit(event);
      }
}