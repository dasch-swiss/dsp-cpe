import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing-module/app-routing.module';
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
    ProjectsComponent
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
