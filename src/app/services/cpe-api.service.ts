import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const projectsGetRoute = "http://localhost:3000/projects/get/"
const projectsRoute = "http://localhost:3000/projects"
const pagesGetRoute = "http://localhost:3000/pages/get/"
const pagesRoute = "http://localhost:3000/pages"
const widgetTypesGetRoute = "http://localhost:3000/widgettypes/get/"
const widgetTypeRoute = "http://localhost:3000/widgettype"

/**
 * The base interface for all resources.
 */
export interface iCpeResource {
    id: string;
    label: string;
    description: string;
}

/**
 * The interface for getting projects from the api service
 */
export interface iProject extends iCpeResource {
    mainPageID: string;
    pages: string[];
}

/**
 * The interface for getting projects from the api service
 */
export interface iPage extends iCpeResource {
    gridDimension: Dimension
    header: Widget[];
    body: Widget[];
    footer: Widget[]
}

type Widget = {
    id: string;
    widgetType: string;
    coordinates: Coordinate
    dimension: Dimension,
    data: any
}

type Coordinate = {
    x: number,
    y: number
}

type Dimension = {
    height: number,
    width: number
}

@Injectable({
    providedIn: "root",
})
export class CpeApiService {
    constructor(private _httpClient: HttpClient) {
    }

    /**
     * returns all the projects from the api route
     */
    getProjects(): Observable<iProject[]> {
        return this._httpClient.get<iProject[]>(projectsRoute);
    }

    /**
     * gets a specific project by the id via the api route
     */
    getProject(id: string): Observable<iProject> {
        const url = `${projectsGetRoute}${id}`;
        return this._httpClient.get<iProject>(url);
    }

    /**
     * returns all the pages via the api route
     */
    getPages(): Observable<iPage> {
        return this._httpClient.get<iPage>(pagesRoute);
    }

    /**
     * gets a specific page by the id via the api route
     */
    getPage(id: string): Observable<iPage> {
        const url = `${pagesGetRoute}${id}`;
        return this._httpClient.get<iPage>(url);
    }

    /**
     * returns all the widget types via the api route
     */
    getWidgetTypes(): Observable<any> {
        return this._httpClient.get<iPage>(widgetTypeRoute);
    }

    /**
     * gets a specific widget type by the id via the api route
     */
    getWidgetType(id: string): Observable<any> {
        const url = `${widgetTypesGetRoute}${id}`;
        return this._httpClient.get<any>(url);
    }

}
