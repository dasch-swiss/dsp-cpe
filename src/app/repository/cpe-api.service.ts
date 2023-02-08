import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const getProjectRoute = 'http://localhost:3000/projects/get/'
const getPagesRoute = 'http://localhost:3000/pages/get/'

/**
 * Classes available for lists to get
 */
export type CpeResourceClass = 'projects' | 'pages' | 'widgets';

/**
 * The interface for getting projects from the api service
 */
export interface iProject extends iCpeListResource {
  pages: string[];
}

/**
 * The interface for getting projects from the api service
 */
export interface iPage extends iCpeListResource {
  widgets: string[];
}

/**
 * The base interface for all resources.
 */
export interface iCpeListResource {
  id: string;
  label: string;
  description: string;
}


@Injectable({
  providedIn: 'root',
})

export class CpeApiService {
  constructor(private _httpClient: HttpClient) { }

  /**
   * return a list of instances of the desired resource class from the api route
   */
  getList(cpeClass: CpeResourceClass): Observable<iCpeListResource[]> {
    return this._httpClient.get<iCpeListResource[]>(`http://localhost:3000/${cpeClass}`);
  }

  /**
   * get a projects data via the api route
   */
  getPage(id: string): Observable<iPage> {
    const url = `${getPagesRoute}${id}`;
    return this._httpClient.get<iPage>(url);
  }

  /**
   * get a projects data via the api route
   */
  getProject(id: string): Observable<iProject> {
    const url = `${getProjectRoute}${id}`;
    return this._httpClient.get<iProject>(url);
  }
}

