import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'app-text-widget',
    templateUrl: './text-widget.component.html'
})
export class TextWidgetComponent implements OnInit {
    @Input() text: string;

    constructor() {
    }

    ngOnInit() {
    }
}
