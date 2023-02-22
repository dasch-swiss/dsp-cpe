import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {Page, Project, Widget} from "../cpe/model/page-data-structure";

const projects: {[key: string]: any} = {
    "p-001": {
        "id": "p-001",
        "label": "Project 1: MLS",
        "description": "This is the first project",
        "gridDimension": {"height": 6, "width": 12},
        "mainPageID": "page-001-001",
        "header": [
            {
                "id": "W01",
                "widgetType": "title",
                "coordinates": {"x": 0, "y": 0},
                "dimension": {"height": 1, "width": 12},
                "data": "BEOL Title"
            }
        ],
        "body" : [
            "page-001-001",
            "page-001-002"
        ],
        "footer": [
            {
                "id": "W02",
                "widgetType": "text",
                "coordinates": {"x": 0, "y": 5},
                "dimension": {"height": 1, "width": 12},
                "data": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
            }
        ]
    },
    "p-002": {
        "id": "p-002",
        "label": "Project 2: Beol",
        "description": "This is the second project",
        "gridDimension": {"height": 6, "width": 12},
        "mainPageID": "page-002-001",
        "header": [
            {
                "id": "W03",
                "widgetType": "image",
                "coordinates": {"x": 0, "y": 0},
                "dimension": {"height": 1, "width": 2},
                "data": "https://picsum.photos/400/200"
            },
            {
                "id": "W04",
                "widgetType": "title",
                "coordinates": {"x": 2, "y": 0},
                "dimension": {"height": 1, "width": 10},
                "data": "Dies ist der Titel Widget!"
            }
        ],
        "body": [
            "page-002-001",
            "page-002-002"
        ],
        "footer": [
            {
                "id": "W05",
                "widgetType": "text",
                "coordinates": {"x": 0, "y": 5},
                "dimension": {"height": 1, "width": 12},
                "data": "Dies ist der Footer"
            }
        ]
    }
}

const pages: {[key: string]: any} = {
    "page-001-001": {
        "id": "page-001-001",
        "label": "First page",
        "widgets": [
            {
                "id": "W09",
                "widgetType": "search",
                "coordinates": {"x": 0, "y": 1},
                "dimension": {"height": 4, "width": 3}
            },
            {
                "id": "W10",
                "widgetType": "result",
                "coordinates": {"x": 0, "y": 2},
                "dimension": {"height": 4, "width": 5}
            }
        ]
    },
    "page-001-002": {
        "id": "page-001-002",
        "label": "Second page",
        "widgets": [
            {
                "id": "W11",
                "widgetType": "text",
                "coordinates": {"x": 0, "y": 1},
                "dimension": {"height": 4, "width": 4}
            },
            {
                "id": "W12",
                "widgetType": "image",
                "coordinates": {"x": 4, "y": 1},
                "dimension": {"height": 4, "width": 4},
                "data": "https://picsum.photos/700/300"
            }
        ]
    },
    "page-002-001": {
        "id": "page-002-001",
        "label": "First page",
        "widgets": [
            {
                "id": "W13",
                "widgetType": "text",
                "coordinates": {"x": 0, "y": 1},
                "dimension": {"height": 1, "width": 4},
                "data": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
            },
            {
                "id": "W14",
                "widgetType": "text",
                "coordinates": {"x": 0, "y": 2},
                "dimension": {"height": 2, "width": 4},
                "data": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   \n\nDuis autem vel eum iriure dolor in hendrerit"
            }
        ]
    },
    "page-002-002": {
        "id": "page-002-002",
        "label": "Second page",
        "widgets": [
            {
                "id": "W15",
                "widgetType": "image",
                "coordinates": {"x": 2, "y": 1},
                "dimension": {"height": 3, "width": 3},
                "data": "https://picsum.photos/400/400"
            }
        ]
    }
}

@Injectable({
    providedIn: "root",
})
export class CpeApiService {
    constructor(private _httpClient: HttpClient) {
    }

    /**
     * returns all the projects
     */
    getProjects(): Observable<Project[]> {
        return of(Object.values(projects).map(project => {
            const newProject = new Project(project.id, project.label, project.description, project.mainPageID, project.gridDimension);
            newProject.header = project.header.map((widget: any) => new Widget(widget.id, widget.widgetType, widget.coordinates, widget.dimension, widget.data));
            newProject.footer = project.footer.map((widget: any) => new Widget(widget.id, widget.widgetType, widget.coordinates, widget.dimension, widget.data));
            return newProject;
        }));
    }

    /**
     * gets a specific project by the id
     */
    getProject(id: string): Observable<Project> {
        if (projects.hasOwnProperty(id)) {
            const project = projects[id];
            const newProject = new Project(project.id, project.label, project.description, project.mainPageID, project.gridDimension);

            newProject.header = project.header.map((widget: any) => new Widget(widget.id, widget.widgetType, widget.coordinates, widget.dimension, widget.data));
            newProject.body = project.body.map((pageID: string) => {
                const page = pages[pageID];
                const newPage = new Page(page.id, page.label);
                newPage.widgets = page.widgets.map((widget: any) => new Widget(widget.id, widget.widgetType, widget.coordinates, widget.dimension, widget.data));
                return newPage;
            });
            newProject.footer = project.footer.map((widget: any) => new Widget(widget.id, widget.widgetType, widget.coordinates, widget.dimension, widget.data));

            return of(newProject);
        } else {
            return throwError(() => new Error(`No project found with ID: ${id}"`))
        }
    }

    /**
     * gets a specific page by the id
     */
    getPage(id: string): Observable<Page> {
        if (pages.hasOwnProperty(id)) {
            const page = pages[id];
            const newPage = new Page(page.id, page.label);
            newPage.widgets = page.widgets.map((widget: any) => new Widget(widget.id, widget.widgetType, widget.coordinates, widget.dimension, widget.data));
            return of(newPage);
        } else {
            return throwError(() => new Error(`No page found with ID: ${id}"`))
        }
    }
}
