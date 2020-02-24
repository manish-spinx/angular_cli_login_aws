import { Component,OnInit,Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'spinx-button',
    templateUrl: 'button.component.html'
})

export class ButtonComponent implements OnInit {

    @Input() label: string;
    @Input() class: string;
    @Input() id: string;
    @Input() class_custom: string;
    @Input() disabled: boolean;
        
    @Output() onClick = new EventEmitter<any>();
    constructor() { }

    ngOnInit() { }
    onClickButton(event) {
        this.onClick.emit(event);
      }
}