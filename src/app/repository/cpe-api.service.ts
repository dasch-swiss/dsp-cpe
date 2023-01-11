import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";

export const getProjectRoute = 'http://localhost:3000/projects/get/';
export const getPageRoute = 'http://localhost:3000/pages/get/';
export const getPagePartRoute = 'http://localhost:3000/page-parts/get/';

/**
 * Classes available for lists to get
 */
export type CpeResourceClass = 'projects' | 'pages' | 'page-parts' | 'widgets';

export type CpePagePart = 'header' | 'body' | 'footer';

export type CpeWidget = 'text' | 'image';

export type Coordinates = {x: number, y: number};

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
  header: string,
  body: string,
  footer: string,
  grid_dimensions: Coordinates,
}

/**
 * The interface for getting page parts from the api service
 */
export interface iPagePart extends iCpeListResource {
  page_id: string,
  pp_type: CpePagePart,
  widgets: string[]
}

/**
 * The interface for getting widgets from the api service
 */
export interface iWidget extends iCpeListResource {
  page_part_id: string,
  widget_type: CpeWidget,
  coordinates: Coordinates;
  height: number,
  width: number
}

export interface iImageWidget extends iWidget {
  text: string,
  image: string,
  alt: string

}

export interface iTextWidget extends iWidget {
  text: string,
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
  constructor(private http: HttpClient) { }

  /**
   * return a list of instances of the desired resource class from the api route
   */
  getList(cpeClass: CpeResourceClass): Observable<iCpeListResource[]> {
    return this.http.get<iCpeListResource[]>(`http://localhost:3000/${cpeClass}`).pipe(
      // tap(_ => console.info(`fetched list for class =${cpeClass}`)),
      catchError(this.handleError<iCpeListResource[]>(`getList class =${cpeClass}`))
    );
  }

  /**
   * get a projects data via the api route
   */
  getProject(id: string): Observable<iProject> {
    const url = `${getProjectRoute}${id}`;
    return this.http.get<iProject>(url).pipe(
      tap(_ => console.info(`fetched project id = ${id}`)),
      catchError(this.handleError<iProject>(`getProject id = ${id}`))
    );
  }

  /**
   * get a projects data via the api route
   */
  getPage(id: string): Observable<iPage> {
    const url = `${getPageRoute}${id}`;
    return this.http.get<iPage>(url).pipe(
      // tap(_ => console.info(`fetched page id = ${id}`)),
      catchError(this.handleError<iPage>(`get page id = ${id}`))
    );
  }

  /**
   * get a projects data via the api route
   */
  getPagePart(id: string): Observable<iPagePart> {
    const url = `${getPagePartRoute}${id}`;
    return this.http.get<iPagePart>(url).pipe(
      // tap(_ => console.info(`fetched page id = ${id}`)),
      catchError(this.handleError<iPagePart>(`get page id = ${id}`))
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

