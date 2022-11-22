import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CpeComponent } from './cpe/cpe.component';
import { HeaderComponent } from './cpe/header/header.component';
import { BodyComponent } from './cpe/body/body.component';
import { FooterComponent } from './cpe/footer/footer.component';
import {GridsterModule} from "angular-gridster2";
import { Widget1Component } from './widgets/widget1/widget1.component';
import { Widget2Component } from './widgets/widget2/widget2.component';
import { Widget3Component } from './widgets/widget3/widget3.component';

@NgModule({
  declarations: [
    AppComponent,
    CpeComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    Widget1Component,
    Widget2Component,
    Widget3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridsterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
