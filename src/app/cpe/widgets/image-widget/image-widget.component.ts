import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-image-widget',
    templateUrl: './image-widget.component.html'
})
export class ImageWidgetComponent {
    @Input() data: any;

    constructor() {
    }
}
