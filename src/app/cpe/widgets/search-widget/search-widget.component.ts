import {Component, OnInit} from "@angular/core";
import {gridCoordinates, WidgetData} from "../../blue-boxes/model/page-data-structure";
import {Observable, of, throwError} from "rxjs";
import {delay} from "rxjs/operators";
import {ComponentCommunicationService, Events, Status} from "../../../services/component-communication.service";

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

  getMockFail(): Observable<any> {
      return throwError(() => new Error("Failed!"));
  }

  changeBG() {
      this._communicationService.emit({event: Events.changeBackground, status: Status.finished});
  }

  search() {
      this._communicationService.emit({event: Events.searchExecuted, status: Status.started});
      this.getMockData()
          .subscribe(data => {
              this._communicationService.emit({event: Events.searchExecuted, status: Status.finished, value: data});
          });
  }

  searchWithError() {
      this.getMockFail()
          .subscribe({
              error: _ => {
                  this._communicationService.emit({event: Events.searchExecuted, status: Status.failed, errorMsg: "Search failed!"});
              }
          })
  }
}
