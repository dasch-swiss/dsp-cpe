import { Injectable } from '@angular/core';
import {CpeApiService} from "./cpe-api.service";
import {Page, PagePart, PagePartFactory} from "./repository-model";
import {firstValueFrom} from "rxjs";

interface iPagePartRepo {
  getPagePartById(id: string): any;
}

@Injectable({
  providedIn: 'root'
})
export class PagePartsRepositoryService implements iPagePartRepo{

  constructor(private apiService: CpeApiService) { }

  /**
   * get a page via the api service. Return a Page as Promise.
   */
  async getPagePartById(id: string): Promise<PagePart> {
    const resource$ =  this.apiService.getPagePart(id);
    const pagePart = await firstValueFrom(resource$)
    return PagePartFactory.build(pagePart);
  }

  /**
   * check if a page exists in the api. Return a boolean as Promise.
   */
  async exists(id: string): Promise<boolean> {
    return !!await this.getPagePartById(id);
  }
}
