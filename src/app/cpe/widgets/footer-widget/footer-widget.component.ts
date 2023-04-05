import {Component, Input, OnInit} from "@angular/core";
import {ComponentCommunicationService, Events, Status} from "../../../services/component-communication.service";

@Component({
  selector: 'app-footer-widget',
  templateUrl: './footer-widget.component.html'
})
export class FooterWidgetComponent implements OnInit{
    @Input() data: any;

    constructor(private _communicationService: ComponentCommunicationService) {
    }

    ngOnInit() {
    }

    changeGridColor() {
        console.log('fuuu')
        this._communicationService.emit({event: Events.showGrid, status: Status.finished});
    }

}
