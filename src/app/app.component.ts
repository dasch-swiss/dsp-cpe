import {Component} from "@angular/core";
import {TailwindThemeService} from "./services/tailwind-theme.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    constructor(private _themeService: TailwindThemeService) {
        this._themeService.initThemes();
    }
}
