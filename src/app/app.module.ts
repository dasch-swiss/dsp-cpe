import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CpeComponent } from './cpe/cpe.component';
import { HeaderComponent } from './cpe/header/header.component';
import { BodyComponent } from './cpe/body/body.component';
import { FooterComponent } from './cpe/footer/footer.component';
import {GuiElementsModule} from "./gui-elements-module/gui-elements.module";
import {PlaygroundModule} from "./playground/playground.module";

@NgModule({
  declarations: [
    AppComponent,
    CpeComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GuiElementsModule, // our gui elements to use
    PlaygroundModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
