import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {Tw} from "../../../tailwind/tailwind";

export type Variant = 'Primary' | 'Secondary';

@Component({
  selector: 'cpe-button',
  templateUrl: './cpe-button.component.html',
  styleUrls: ['./cpe-button.component.scss']
})
export class CpeButtonComponent implements OnInit {

  @Input() disabled? = false;

  @Input() text? = '';

  @Input() variant?: Variant  = 'Primary';

  @Output() click = new EventEmitter();

  style = ''
  style2 = "inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2";
  
  ngOnInit() {
    this.style = Tw()
      .inline_flex
      .bg_indigo_400
      .focus.inline_flex
      .hover.bg_indigo_700
      .tw_block
      .$()
  }




  public onClickEvent(event: Event) {
    if (this.disabled) {
      // no event propagated
      event.stopPropagation();
    }
  }
}
