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

  // the buttons class string
  style = ''

  constructor() {
    super();
  }

  ngOnInit() {
    this.style = "inline-flex items-center rounded border border-transparent bg-primary-700 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2";
  }
  /**
   * disables the callbacks execution if disabled
   */
  public onClickEvent(event: Event) {
    if (this.disabled) {
      // no event propagated
      event.stopPropagation();
    }
  }
}
