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

  constructor( private apiService: CpeApiService) {
  }

  /**
   * gets a projects data via the api service. Returns an instanced Project as Promise.
   */
  async getPageById(id: string): Promise<Page> {
    const resource$ =  this.apiService.getPageB(id);
    const page = await firstValueFrom(resource$)
    return new Page(page);
  }
}
