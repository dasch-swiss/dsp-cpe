import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpePlaygroundComponent } from './cpe-playground/cpe-playground.component';
import {GuiElementsModule} from "../gui-elements-module/gui-elements.module";



@NgModule({
  declarations: [
    CpePlaygroundComponent
  ],
  imports: [
    CommonModule,
    GuiElementsModule
  ],
  exports: [
    CpePlaygroundComponent
  ]
})
export class PlaygroundModule { }
