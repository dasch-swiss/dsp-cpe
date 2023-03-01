import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {Page, Project, Widget} from "../cpe/model/page-data-structure";

const projects: {[key: string]: any} = {
    "p-001": {
        "id": "p-001",
        "label": "Project 1: MLS",
        "description": "This is the first project",
        "gridDimension": {"height": 10, "width": 12},
        "mainPageID": "page-001-001",
        "header": {
            "id": "H01",
            "title": "Forschungszentrum Universität Basel",
            "logo": "./assets/logo-1.png",
            "login": true
        },
        "body" : [
            "page-001-001",
            "page-001-002",
            "page-001-003"
        ],
        "footer": {
            "id": "F01",
            "data": "©DaSCH - Swiss National Data and Service Center for the Humanities"
        }
    },
    "p-002": {
        "id": "p-002",
        "label": "Project 2: Beol",
        "description": "This is the second project",
        "gridDimension": {"height": 10, "width": 12},
        "mainPageID": "page-002-001",
        "header": {
            "id": "H02",
            "title": "Musiklexikon der Schweiz",
            "logo": "./assets/logo-2.png",
            "login": false
        },
        "body": [
            "page-002-001",
            "page-002-002"
        ],
        "footer": {
            "id": "F02",
            "data": "©DaSCH - Swiss National Data and Service Center for the Humanities"
        }
    }
}

const pages: {[key: string]: any} = {
    "page-001-001": {
        "id": "page-001-001",
        "label": "Suche",
        "widgets": [
            {
                "id": "W01",
                "widgetType": "search",
                "coordinates": {"x": 0, "y": 2},
                "dimension": {"height": 6, "width": 3}
            },
            {
                "id": "W02",
                "widgetType": "result",
                "coordinates": {"x": 3, "y": 2},
                "dimension": {"height": 6, "width": 5}
            }
        ]
    },
    "page-001-002": {
        "id": "page-001-002",
        "label": "Second page",
        "widgets": [
            {
                "id": "W03",
                "widgetType": "text",
                "coordinates": {"x": 0, "y": 1},
                "dimension": {"height": 6, "width": 4}
            },
            {
                "id": "W04",
                "widgetType": "image",
                "coordinates": {"x": 4, "y": 1},
                "dimension": {"height": 6, "width": 4},
                "data": "https://picsum.photos/700/300"
            }
        ]
    },
    "page-001-003": {
        "id": "page-001-003",
        "label": "Third page",
        "widgets": [
            {
                "id": "W03",
                "widgetType": "text",
                "coordinates": {"x": 0, "y": 1},
                "dimension": {"height": 6, "width": 4}
            },
            {
                "id": "W04",
                "widgetType": "image",
                "coordinates": {"x": 4, "y": 1},
                "dimension": {"height": 6, "width": 4},
                "data": "https://picsum.photos/700/300"
            }
        ]
    },
    "page-002-001": {
        "id": "page-002-001",
        "label": "First page",
        "widgets": [
            {
                "id": "W05",
                "widgetType": "text",
                "coordinates": {"x": 0, "y": 2},
                "dimension": {"height": 2, "width": 4},
                "data": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
            },
            {
                "id": "W06",
                "widgetType": "text",
                "coordinates": {"x": 0, "y": 3},
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
                "id": "W07",
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
            newProject.header = project.header;
            newProject.footer = project.footer;
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

            newProject.header = project.header;
            newProject.body = project.body.map((pageID: string) => {
                const page = pages[pageID];
                const newPage = new Page(page.id, page.label);
                newPage.widgets = page.widgets.map((widget: any) => new Widget(widget.id, widget.widgetType, widget.coordinates, widget.dimension, widget.data));
                return newPage;
            });
            newProject.footer = project.footer;

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
