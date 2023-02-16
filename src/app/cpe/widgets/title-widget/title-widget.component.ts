import {Component, Input} from "@angular/core";

@Component({
    selector: "app-title-widget",
    templateUrl: "./title-widget.component.html"
})
export class TitleWidgetComponent {
    @Input() title: string;
}
