import { Component,OnInit,Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'spinx-multidropdown',
    templateUrl: 'multidropdown.component.html'
})

export class MultidropdownComponent implements OnInit {

    @Input() public label: string;
    @Input() public dropdown_label: string = 'Please Select';
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