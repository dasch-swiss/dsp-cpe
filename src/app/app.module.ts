import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CpeComponent } from './cpe/cpe.component';
import { GridsterModule } from 'angular-gridster2';
import { TestWidgetComponent } from './cpe/widgets/test-widget/test-widget.component';
import { ExcecutorComponent } from './cpe/blue-boxes/excecutor/excecutor.component';
import { AnotherTestWidgetComponent } from './cpe/widgets/another-test-widget/another-test-widget.component';
import { GuiElementsModule } from "./gui-elements-module/gui-elements.module";
import { PlaygroundModule } from "./playground/playground.module";
import { RollbarErrorHandler } from './rollbar';
import { AppInitService } from './app-init.service';
import { CpeInstrumentationToken } from '../config/cpe-tokens';

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
