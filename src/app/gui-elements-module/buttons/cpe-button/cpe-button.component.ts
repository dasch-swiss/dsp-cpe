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

  style = '';

  constructor() {
    super();
  }

  ngOnInit() {
    switch (this.variant) {
      case "Primary": {
        this.style = "inline-flex items-center rounded border border-transparent bg-primary px-2.5 py-1.5 text-xs font-medium text-secondary shadow-sm hover:bg-secondary hover:text-primary hover:ring-primary";
        break;
      }
      case "Secondary": {
        this.style = "inline-flex items-center rounded border border-transparent bg-secondary px-2.5 py-1.5 text-xs font-medium text-primary shadow-sm hover:bg-primary hover:text-secondary hover:ring-primary";
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
