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
                    new Project(project.id, project.label, project.description, project.mainPageID, project.gridDimension)))
            );
    }

    /**
     * get a project via the api service. Return a Project as Promise.
     */
    getProjectById(id: string): Observable<Project> {
        return this._apiService.getProject(id)
            .pipe(
                map((project: iProject) =>
                    new Project(project.id, project.label, project.description, project.mainPageID, project.gridDimension))
            );
    }

    /**
     * get a project via the api service. Return a Project as Promise.
     */
    getProjectByIdFull(id: string): Observable<Project> {
        return this._apiService.getProject(id)
            .pipe(
                mergeMap((project: iProject) => forkJoin([of(project), from(project.body)
                    .pipe(
                        mergeMap(pageID => this._apiService.getPage(pageID)
                            .pipe(
                                map(
                                    (page: iPage) => {
                                        const newPage = new Page(page.id)
                                        newPage.widgets = page.widgets.map(widget => new Widget(widget.id, widget.widgetType, widget.coordinates, widget.dimension, widget.data));
                                        return newPage;
                                    }
                                )
                            )
                        ),
                        toArray()
                    )
                ])),
                map(([project, pages]) => {
                    const newProject = new Project(project.id, project.label, project.description, project.mainPageID, project.gridDimension);
                    newProject.header = project.header.map(widget => new Widget(widget.id, widget.widgetType, widget.coordinates, widget.dimension, widget.data));
                    newProject.body = pages;
                    newProject.footer = project.footer.map(widget => new Widget(widget.id, widget.widgetType, widget.coordinates, widget.dimension, widget.data));
                    return newProject;
                })
            )
    }
}
