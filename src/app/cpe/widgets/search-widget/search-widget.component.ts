import {Component, OnInit} from "@angular/core";
import {gridCoordinates, WidgetData} from "../../blue-boxes/model/page-data-structure";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";
import {
    ComponentCommunicationService,
    CpeEvent,
    Events,
    Status
} from "../../../services/component-communication.service";

export class SearchWidgetData extends WidgetData {
    constructor(id: number, coordinates: gridCoordinates, width: number, height: number) {
        super(id, coordinates, width, height);
    }
}
@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.scss']
})
export class SearchWidgetComponent implements OnInit {

  constructor(private _communicationService: ComponentCommunicationService) { }

  ngOnInit(): void {
  }

  getMockData(): Observable<{id:number, title: string}[]> {
      return of([
          {id: 1, title: 'The first resource'},
          {id: 2, title: 'The second resource'},
          {id: 3, title: 'The last resource'}
      ]).pipe(delay(2000))
  }

  changeBG() {
    this._communicationService.emit(new CpeEvent(Events.changeBackground, Status.finished));
  }

  search() {
      this._communicationService.emit(new CpeEvent(Events.searchExecuted, Status.starting));
      this.getMockData().subscribe(data => {
          this._communicationService.emit(new CpeEvent(Events.searchExecuted, Status.finished, data));
      });
  }
}
