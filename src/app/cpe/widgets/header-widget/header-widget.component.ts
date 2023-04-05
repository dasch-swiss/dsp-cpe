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

    goToPage(pageId: string) {
        this._naviService.navigateToPage(this.data.project, pageId);
    }

    toggleTheme() {
        this._themeService.nextTheme();
    }

}
