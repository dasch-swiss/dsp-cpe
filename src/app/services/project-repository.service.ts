import {Injectable} from "@angular/core";
import {CpeApiService, iPage, iProject} from "./cpe-api.service";
import {Page, Project, Widget} from "../cpe/model/page-data-structure";
import {Observable, forkJoin, map, mergeMap, of, from, toArray} from "rxjs";


@Injectable({
    providedIn: "root"
})
export class ProjectRepositoryService {

    constructor(private _apiService: CpeApiService) {
    }

    /**
     * get the array of CpeResource instances via the api service. Return it as a Promise.
     */
    getProjects(): Observable<Project[]> {
        return this._apiService.getProjects()
            .pipe(
                map((projects: iProject[]) => projects.map((project: iProject) =>
                    new Project(project.id, project.label, project.description, project.mainPageID)))
            );
    }

    /**
     * get a project via the api service. Return a Project as Promise.
     */
    getProjectById(id: string): Observable<Project> {
        return this._apiService.getProject(id)
            .pipe(
                map((project: iProject) =>
                    new Project(project.id, project.label, project.description, project.mainPageID))
            );
    }

    /**
     * get a project via the api service. Return a Project as Promise.
     */
    getProjectByIdFull(id: string): Observable<any> {
        return this._apiService.getProject(id)
            .pipe(
                mergeMap((project: iProject) => forkJoin([of(project), from(project.pages)
                    .pipe(
                        mergeMap((pageID: string) => this._apiService.getPage(pageID)
                            .pipe(
                                map(
                                    (page: iPage) => {
                                        const newPage = new Page(page.id, {
                                            height: page.gridDimension.height,
                                            width: page.gridDimension.width
                                        });
                                        newPage.header = page.header.map(widget => new Widget(widget.id, widget.widgetType, widget.coordinates, widget.dimension, widget.data));
                                        newPage.body = page.body.map(widget => new Widget(widget.id, widget.widgetType, widget.coordinates, widget.dimension, widget.data));
                                        newPage.footer = page.footer.map(widget => new Widget(widget.id, widget.widgetType, widget.coordinates, widget.dimension, widget.data));
                                        return newPage
                                    }
                                ))),
                        toArray())
                ])),
                map(([project, pages]) => {
                    const newProject = new Project(project.id, project.label, project.description, project.mainPageID)
                    newProject.pages = pages;
                    return newProject;
                })
            );
    }
}
