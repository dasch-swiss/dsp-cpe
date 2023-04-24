import {Component, Input, OnInit} from '@angular/core';
import {NavigationService} from "../../../routing-module/navigation.service";
import {TailwindThemeService} from "../../../services/tailwind-theme.service";

@Component({
    selector: 'app-header-widget',
    templateUrl: './header-widget.component.html'
})
export class HeaderWidgetComponent implements OnInit{
    @Input() data: any;

    constructor(private _naviService: NavigationService, private _themeService: TailwindThemeService) {
    }

    ngOnInit() {
    }

    goToPage(pageID: string) {
        this._naviService.navigateToPage(this.data.project, pageID);
    }

    toggleTheme() {
        this._themeService.nextTheme();
    }

}
