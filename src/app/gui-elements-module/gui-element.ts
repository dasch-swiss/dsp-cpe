import {Directive, Input} from "@angular/core";

/**
 * super class GuiElement with all commonalities
 */
@Directive()
export class GuiElement {

  @Input() id = '';

  constructor() {
  }
}
