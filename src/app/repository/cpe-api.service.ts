import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {iCpeListResource, iPage, iProject} from "./repository-model";
import {catchError, Observable, of, tap} from "rxjs";

export const getProjectRoute = 'http://localhost:3000/projects/get/'
export const getPagesRoute = 'http://localhost:3000/pages/get/'

export type CpeResourceClass = 'projects' | 'pages';

@Injectable({
  providedIn: 'root',
})

export class CpeApiService {
  constructor(private http: HttpClient) { }

  /**
   * returns af a resource classes instances from the api route
   */
  getList(cpeClass: CpeResourceClass): Observable<iCpeListResource[]> {
    return this.http.get<iCpeListResource[]>(`http://localhost:3000/${cpeClass}`).pipe(
      // tap(_ => console.info(`fetched list for class =${cpeClass}`)),
      catchError(this.handleError<iCpeListResource[]>(`getList class =${cpeClass}`))
    );
  }

  /**
   * gets a pages data via the api route
   */
  getPage(id: string) {
    return fetch(`http://localhost:3000/pages/get/${id}`);
  }

  /**
   * gets a projects data via the api route
   */
  getPageB(id: string) {
    const url = `${getPagesRoute}${id}`;
    return this.http.get<iPage>(url).pipe(
      // tap(_ => console.info(`fetched project id = ${id}`)),
      catchError(this.handleError<iPage>(`getProject id = ${id}`))
    );
  }

  /**
   * gets a projects data via the api route
   */
  getProject(id: string) {
    const url = `${getProjectRoute}${id}`;
    return this.http.get<iProject>(url).pipe(
      tap(_ => console.info(`fetched project id = ${id}`)),
      catchError(this.handleError<iProject>(`getProject id = ${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

