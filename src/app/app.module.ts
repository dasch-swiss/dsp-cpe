import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './routing-module/app-routing.module';
import { AppComponent } from './app.component';
import { CpeComponent } from './cpe/cpe.component';
import { GridsterModule } from 'angular-gridster2';
import { ExecutorComponent } from './cpe/executor/executor.component';
import { GuiElementsModule } from "./gui-elements-module/gui-elements.module";
import { RollbarErrorHandler } from './rollbar';
import { AppInitService } from './app-init.service';
import { CpeInstrumentationToken } from '../config/cpe-tokens';
import { ProjectComponent } from './cpe/project/project.component';
import { SearchWidgetComponent } from './cpe/widgets/search-widget/search-widget.component';
import { ResultWidgetComponent } from './cpe/widgets/result-widget/result-widget.component';
import { ImageWidgetComponent } from './cpe/widgets/image-widget/image-widget.component';
import { TextWidgetComponent } from './cpe/widgets/text-widget/text-widget.component';
import { HeaderWidgetComponent } from './cpe/widgets/header-widget/header-widget.component';
import { FooterWidgetComponent } from './cpe/widgets/footer-widget/footer-widget.component';
@NgModule({
    declarations: [
        AppComponent,
        CpeComponent,
        ProjectComponent,
        ExecutorComponent,
        SearchWidgetComponent,
        ResultWidgetComponent,
        ImageWidgetComponent,
        TextWidgetComponent,
        HeaderWidgetComponent,
        FooterWidgetComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GuiElementsModule,
        GridsterModule
    ],
    providers: [
        AppInitService,
        {
            provide: CpeInstrumentationToken,
            useFactory: (appInitService: AppInitService) => appInitService.cpeInstrumentationConfig,
            deps: [AppInitService]
        },
        {
            provide: ErrorHandler,
            useClass: RollbarErrorHandler,
            deps: [AppInitService]
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
