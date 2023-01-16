import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";

export const getProjectRoute = 'http://localhost:3000/projects/get/'
export const getPagesRoute = 'http://localhost:3000/pages/get/'

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
  constructor(private _http: HttpClient) { }

  /**
   * return a list of instances of the desired resource class from the api route
   */
  getList(cpeClass: CpeResourceClass): Observable<iCpeListResource[]> {
    return this._http.get<iCpeListResource[]>(`http://localhost:3000/${cpeClass}`).pipe(
      // tap(_ => console.info(`fetched list for class =${cpeClass}`)),
      catchError(this.handleError<iCpeListResource[]>(`getList class =${cpeClass}`))
    );
  }

  /**
   * get a projects data via the api route
   */
  getPage(id: string) {
    const url = `${getPagesRoute}${id}`;
    return this._http.get<iPage>(url).pipe(
      // tap(_ => console.info(`fetched project id = ${id}`)),
      catchError(this.handleError<iPage>(`getProject id = ${id}`))
    );
  }

  /**
   * get a projects data via the api route
   */
  getProject(id: string) {
    const url = `${getProjectRoute}${id}`;
    return this._http.get<iProject>(url).pipe(
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

