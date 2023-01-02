import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CpeComponent } from './cpe/cpe.component';
import {GridsterModule} from 'angular-gridster2';
import { TestWidgetComponent } from './cpe/widgets/test-widget/test-widget.component';
import { ExcecutorComponent } from './cpe/blue-boxes/excecutor/excecutor.component';
import { AnotherTestWidgetComponent } from './cpe/widgets/another-test-widget/another-test-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    CpeComponent,
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
