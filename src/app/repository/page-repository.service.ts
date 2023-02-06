import { Injectable } from '@angular/core';
import {CpeApiService} from "./cpe-api.service";
import {Page} from "./repository-model";
import {map, Observable} from "rxjs";


interface iPageRepo {
  getPageById(id: string): any;
}

@Injectable({
  providedIn: 'root'
})
export class PageRepositoryService implements iPageRepo {

  constructor(private _apiService: CpeApiService) {
  }

  /**
   * get a page via the api service. Return a Page as Promise.
   */
  getPageById(id: string): Observable<Page> {
    return this._apiService.getPage(id)
        .pipe(
            map(page => new Page(page))
        );
  }
}
