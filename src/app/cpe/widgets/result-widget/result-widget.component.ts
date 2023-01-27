import {Component, OnInit} from "@angular/core";
import {gridCoordinates, WidgetData} from "../../blue-boxes/model/page-data-structure";
import {ComponentCommunicationService, Events} from "../../../services/component-communication.service";

export class ResultWidgetData extends WidgetData {
    constructor(id: number, coordinates: gridCoordinates, width: number, height: number) {
        super(id, coordinates, width, height);
    }
}

@Component({
  selector: 'app-result-widget',
  templateUrl: './result-widget.component.html',
  styleUrls: ['./result-widget.component.scss']
})
export class ResultWidgetComponent implements OnInit {
  color = "#ffffff";
  result: any[]
  loading: Boolean;
  error: Boolean;

  constructor(private _communicationService: ComponentCommunicationService) { }

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
      });

      this._communicationService.on(Events.changeBackground, _ => {
          this.color = "#729eee";
      }, () => {},
          _ => {}
      );
  }

  setUp() {
      this.error = false;
      this.loading = false;
      this.result = [];
  }

}
