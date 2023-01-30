import { ErrorHandler, NgModule } from '@angular/core';
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
import { RollbarErrorHandler } from './rollbar';
import { AppInitService } from './app-init.service';
import { CpeInstrumentationToken } from '../config/cpe-tokens';
import { PageComponent } from './cpe/page/page.component';
import { ProjectComponent } from './cpe/project/project.component';
import { ProjectsComponent } from './cpe/projects/projects.component';
import { SearchWidgetComponent } from './cpe/widgets/search-widget/search-widget.component';
import { ResultWidgetComponent } from './cpe/widgets/result-widget/result-widget.component';

@NgModule({
    declarations: [
        AppComponent,
        CpeComponent,
        ProjectComponent,
    	PageComponent,
    	ProjectsComponent,
        TestWidgetComponent,
        ExcecutorComponent,
        AnotherTestWidgetComponent,
        SearchWidgetComponent,
        ResultWidgetComponent
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
