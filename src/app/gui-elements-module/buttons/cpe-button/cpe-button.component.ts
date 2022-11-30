import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {GuiElement} from "../../gui-element";

export type Variant = 'Primary' | 'Secondary';

@Component({
  selector: 'cpe-button',
  templateUrl: './cpe-button.component.html'
})
export class CpeButtonComponent extends GuiElement implements OnInit {

  @Input() disabled? = false;

  @Input() text? = '';

  @Input() variant?: Variant  = 'Primary';

  @Output() click = new EventEmitter();

  style = ''

  constructor() {
    super();
  }

  ngOnInit() {
    switch (this.variant) {
      case "Primary": {
        this.style = "inline-flex items-center rounded border border-transparent bg-blue-700 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
        break;
      }
      case "Secondary": {
        this.style = "inline-flex items-center rounded border border-transparent bg-blue-100 px-2.5 py-1.5 text-xs font-medium text-blue-700 shadow-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
        break;
      }
    }
  }
  /**
   * disables the callbacks execution if disabled equals true
   */
  public onClickEvent(event: Event) {
    if (this.disabled) {
      // no event propagated
      event.stopPropagation();
    }
  }
}
