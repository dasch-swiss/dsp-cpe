import { Injectable } from '@angular/core';
import {CpeApiService} from "./cpe-api.service";
import {Page} from "./repository-model";


interface iPageRepo {
  getPageByID(id: string): any;
}

@Injectable({
  providedIn: 'root'
})
export class PageRepositoryService implements iPageRepo {

  constructor( private apiService: CpeApiService) {
  }

  /**
   * gets the pages data via the api service. Returns a Page object
   */
  async getPageByID(id: string): Promise<Page | undefined> {
    const rJson = await this.apiService.getPage(id).then(response => {
      return response.json()
    });
    if(!Object.keys(rJson).length) {
      return undefined; } // if no such project exists
    const p = new Page(rJson['id']);
    p.label = rJson['label'];
    p.description = rJson['description'];
    p.widgets = rJson['widgets'];
    return p;
  }
}
