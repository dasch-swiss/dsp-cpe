import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CpeComponent } from './cpe/cpe.component';
import { HeaderComponent } from './cpe/header/header.component';
import { BodyComponent } from './cpe/body/body.component';
import { FooterComponent } from './cpe/footer/footer.component';
import { GuiElementsModule } from "./gui-elements-module/gui-elements.module";
import { PlaygroundModule } from "./playground/playground.module";
import { GridsterModule } from "angular-gridster2";
import { Widget1Component } from './widgets/widget1/widget1.component';
import { Widget2Component } from './widgets/widget2/widget2.component';
import { Widget3Component } from './widgets/widget3/widget3.component';
import { TestWidgetComponent } from './cpe/widgets/test-widget/test-widget.component';
import { ExcecutorComponent } from './cpe/blue-boxes/excecutor/excecutor.component';
import { AnotherTestWidgetComponent } from './cpe/widgets/another-test-widget/another-test-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    CpeComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    Widget1Component,
    Widget2Component,
    Widget3Component,
    TestWidgetComponent,
    ExcecutorComponent,
    AnotherTestWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GuiElementsModule,
    PlaygroundModule,
    GridsterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
