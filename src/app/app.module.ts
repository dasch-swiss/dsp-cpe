import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CpeComponent } from './cpe/cpe.component';
import { HeaderComponent } from './cpe/header/header.component';
import { BodyComponent } from './cpe/body/body.component';
import { FooterComponent } from './cpe/footer/footer.component';
import {GridsterModule} from "angular-gridster2";
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
    TestWidgetComponent,
    ExcecutorComponent,
    AnotherTestWidgetComponent
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
