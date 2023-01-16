import { Injectable } from '@angular/core';
import {CpeApiService} from "./cpe-api.service";
import {Page} from "./repository-model";
import {firstValueFrom} from "rxjs";


interface iPageRepo {
  getPageById(id: string): any;
}

@Injectable({
  providedIn: 'root'
})
export class PageRepositoryService implements iPageRepo {

  constructor( private _apiService: CpeApiService) {
  }

  /**
   * get a page via the api service. Return a Page as Promise.
   */
  async getPageById(id: string): Promise<Page> {
    const resource$ =  this._apiService.getPage(id);
    const page = await firstValueFrom(resource$)
    return new Page(page);
  }
}
