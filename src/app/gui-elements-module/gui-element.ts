import {Directive, Input} from "@angular/core";

/**
 * super class GuiElement with all commonalities; enables tailwind to be used by subclasses within their template.
 */
@Directive()
export class GuiElement {

  @Input() id = '';

  constructor() {
  }
}
