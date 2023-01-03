import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './routing-module/app-routing.module';

import { AppComponent } from './app.component';
import { CpeComponent } from './cpe/cpe.component';
import { GridsterModule } from 'angular-gridster2';
import { TestWidgetComponent } from './cpe/widgets/test-widget/test-widget.component';
import { ExcecutorComponent } from './cpe/blue-boxes/excecutor/excecutor.component';
import { AnotherTestWidgetComponent } from './cpe/widgets/another-test-widget/another-test-widget.component';
import { GuiElementsModule } from "./gui-elements-module/gui-elements.module";
import { PlaygroundModule } from "./playground/playground.module";
import { Widget1Component } from './widgets/widget1/widget1.component';
import { Widget2Component } from './widgets/widget2/widget2.component';
import { Widget3Component } from './widgets/widget3/widget3.component';
import { ProjectComponent } from './cpe/project/project.component';
import { PageComponent } from './cpe/page/page.component';
import { ProjectsComponent } from './cpe/projects/projects.component';

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
    ProjectComponent,
    PageComponent,
    ProjectsComponent,
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
