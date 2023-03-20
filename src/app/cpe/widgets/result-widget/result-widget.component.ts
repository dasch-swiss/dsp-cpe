import {Component, OnInit} from "@angular/core";
import {ComponentCommunicationService, Events} from "../../../services/component-communication.service";

@Component({
    selector: "app-result-widget",
    templateUrl: "./result-widget.component.html",
    styleUrls: ["./result-widget.component.scss"]
})
export class ResultWidgetComponent implements OnInit {
    result: any[]
    loading: Boolean;
    error: Boolean;

    constructor(private _communicationService: ComponentCommunicationService) {
    }

    ngOnInit(): void {
        this.setUp();

        this._communicationService.on(Events.searchExecuted, (value) => {
                this.setUp();
                this.loading = false;
                this.result = value;
            }, () => {
                this.error = false;
                this.result = [];
                this.loading = true;
            }, _ => {
                this.error = true;
            }
        );
    }

    setUp() {
        this.error = false;
        this.loading = false;
        this.result = [];
    }

}
