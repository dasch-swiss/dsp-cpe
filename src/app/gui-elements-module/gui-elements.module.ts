import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpeButtonComponent } from './buttons/cpe-button/cpe-button.component';

@NgModule({
  declarations: [
    CpeButtonComponent
  ],
  imports: [
    CommonModule
  ],

  exports: [
    CpeButtonComponent
  ]
})
export class GuiElementsModule { }
