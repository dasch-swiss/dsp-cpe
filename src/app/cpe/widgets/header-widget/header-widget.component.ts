import {Component, Input, OnInit} from '@angular/core';
import {NavigationService} from "../../../routing-module/navigation.service";

@Component({
    selector: 'app-header-widget',
    templateUrl: './header-widget.component.html',
    styleUrls: ['./header-widget.component.scss']
})
export class HeaderWidgetComponent implements OnInit{
    @Input() data: any;

    constructor(private _naviService: NavigationService) {
    }

    ngOnInit() {
        console.log(this.data);
    }

    goToPage(pageId: string) {
        this._naviService.navigateToPage(this.data.project, pageId);
    }

}
