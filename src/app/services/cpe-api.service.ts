import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {Page, Project, Widget} from "../cpe/model/page-data-structure";

const projects: {[key: string]: any} = {
    "p-001": {
        "id": "p-001",
        "label": "Archäologie",
        "description": "This is the first project",
        "gridDimension": {"height": 10, "width": 12},
        "mainPageID": "page-001-001",
        "header": {
            "id": "H01",
            "title": "Institut für Archäologische Wissenschaften",
            "logo": "./assets/logo-1.png",
            "login": true
        },
        "body" : [
            "page-001-001",
            "page-001-002"
        ],
        "footer": {
            "id": "F01",
            "data": "©DaSCH - Swiss National Data and Service Center for the Humanities"
        }
    },
    "p-002": {
        "id": "p-002",
        "label": "Englische Literatur",
        "description": "This is the second project",
        "gridDimension": {"height": 10, "width": 12},
        "mainPageID": "page-002-001",
        "header": {
            "id": "H02",
            "title": "Englisches Seminar",
            "logo": "./assets/logo-2.png",
            "login": false
        },
        "body": [
            "page-002-001",
            "page-002-002",
            "page-002-003"
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
        "label": "Home",
        "widgets": [
            {
                "id": "W04",
                "widgetType": "image",
                "coordinates": {"x": 1, "y": 1},
                "dimension": {"height": 7, "width": 10},
                "data": "./assets/augusta-raurica.jpg"
            }
        ]
    },
    "page-001-002": {
        "id": "page-001-002",
        "label": "Ägypten",
        "widgets": [
            {
                "id": "W04",
                "widgetType": "image",
                "coordinates": {"x": 0, "y": 0},
                "dimension": {"height": 2, "width": 4},
                "data": "./assets/pyramids.jpg"
            },
            {
                "id": "W03",
                "widgetType": "text",
                "coordinates": {"x": 0, "y": 2},
                "dimension": {"height": 8, "width": 4},
                "data": "<p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p> <p>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>"
            },
            {
                "id": "W03",
                "widgetType": "text",
                "coordinates": {"x": 4, "y": 0},
                "dimension": {"height": 7, "width": 4},
                "data": "<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p><p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>"
            },
            {
                "id": "W04",
                "widgetType": "image",
                "coordinates": {"x": 4, "y": 7},
                "dimension": {"height": 3, "width": 4},
                "data": "./assets/wall.jpg"
            },
            {
                "id": "W04",
                "widgetType": "image",
                "coordinates": {"x": 8, "y": 0},
                "dimension": {"height": 2, "width": 4},
                "data": "./assets/tomb.jpg"
            },
            {
                "id": "W03",
                "widgetType": "text",
                "coordinates": {"x": 8, "y": 2},
                "dimension": {"height": 8, "width": 4},
                "data": "<p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.   </p><p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.</p><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>Sed at lobortis felis. Duis porttitor eros eu felis lobortis, vel rhoncus tellus fermentum. In augue massa, consectetur ac lacus a, sodales dictum ipsum. Praesent id pellentesque ex, et ultricies ipsum. Integer maximus dapibus nibh, eu commodo tellus molestie vitae. Nulla ultrices molestie velit at scelerisque. Cras ante tellus, aliquam at urna eu, lobortis pretium turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam sollicitudin tristique diam, eget porttitor nulla commodo id. Donec ultrices velit vel tellus pharetra egestas. Sed fermentum scelerisque neque, et interdum justo accumsan a. Maecenas ornare lectus a ante sollicitudin blandit. Nunc at orci ut odio dictum mollis.<p></p>"
            }
        ]
    },
    "page-002-001": {
        "id": "page-002-001",
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
    "page-002-002": {
        "id": "page-002-002",
        "label": "Shakespeare",
        "widgets": [
            {
                "id": "W03",
                "widgetType": "text",
                "coordinates": {"x": 1, "y": 1},
                "dimension": {"height": 8, "width": 7},
                "data": "<p>Phasellus leo nibh, fringilla id suscipit sed, porta non diam. Phasellus elementum odio vel aliquam convallis. Nulla porttitor imperdiet tellus, ac placerat mauris luctus sit amet. Donec malesuada quis turpis id congue. Vivamus rutrum, elit at condimentum convallis, enim dui pellentesque mauris, in iaculis elit dui nec nisl. Nunc volutpat fermentum eros vitae pretium. In tristique elit lectus, eget porta magna accumsan non. Integer eget suscipit ante. Nulla ac malesuada libero, in tincidunt magna. Duis turpis neque, porta a mauris quis, blandit euismod massa. Sed ultrices sollicitudin erat, id interdum mi eleifend id. Cras pellentesque imperdiet convallis. Vivamus in lacus vitae nisl tristique aliquet at porttitor arcu. Quisque vitae tortor id nulla convallis consequat. Duis volutpat lobortis libero nec scelerisque. Vestibulum ac mi maximus, consectetur nulla nec, vestibulum arcu.</p><p>Maecenas dictum tellus eget elit viverra efficitur. Aenean imperdiet nisi risus, ac aliquam tortor convallis id. Donec sodales urna metus, at dapibus nulla lobortis ac. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas interdum sapien sit amet lacinia vehicula. Morbi in leo congue, consectetur ex vitae, sollicitudin massa. Pellentesque tincidunt lacus quis cursus faucibus. Phasellus vulputate blandit nunc, a molestie mi tincidunt id.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum mauris ac ante pharetra feugiat. Maecenas nec pretium metus. Aliquam vestibulum scelerisque risus sit amet eleifend. Donec vehicula lectus et nibh fermentum ultricies. Aenean magna erat, ultrices non tortor a, gravida ultricies ipsum. Proin pharetra tempor tincidunt. In non velit at est suscipit pellentesque. Morbi justo enim, euismod sit amet imperdiet et, sollicitudin ac risus. Curabitur ultrices enim turpis, rutrum consectetur ante pellentesque pharetra. Integer consequat ante sem, sed interdum tellus viverra non. Ut magna neque, facilisis in hendrerit id, dictum nec mi. Donec interdum mi ut sodales eleifend. </p><p>Sed at lobortis felis. Duis porttitor eros eu felis lobortis, vel rhoncus tellus fermentum. In augue massa, consectetur ac lacus a, sodales dictum ipsum. Praesent id pellentesque ex, et ultricies ipsum. Integer maximus dapibus nibh, eu commodo tellus molestie vitae. Nulla ultrices molestie velit at scelerisque. Cras ante tellus, aliquam at urna eu, lobortis pretium turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam sollicitudin tristique diam, eget porttitor nulla commodo id. Donec ultrices velit vel tellus pharetra egestas. Sed fermentum scelerisque neque, et interdum justo accumsan a. Maecenas ornare lectus a ante sollicitudin blandit. Nunc at orci ut odio dictum mollis.</p>"
            },
            {
                "id": "W04",
                "widgetType": "image",
                "coordinates": {"x": 8, "y": 1},
                "dimension": {"height": 8, "width": 3},
                "data": "./assets/book-shakespeare.jpg"
            }
        ]
    },
    "page-002-003": {
        "id": "page-002-003",
        "label": "Globe Theater",
        "widgets": [
            {
                "id": "W07",
                "widgetType": "image",
                "coordinates": {"x": 1, "y": 1},
                "dimension": {"height": 4, "width": 4},
                "data": "./assets/globe-outside.jpg"
            },
            {
                "id": "W07",
                "widgetType": "image",
                "coordinates": {"x": 1, "y": 5},
                "dimension": {"height": 4, "width": 4},
                "data": "./assets/globe-inside.jpg"
            },
            {
                "id": "W03",
                "widgetType": "text",
                "coordinates": {"x": 5, "y": 1},
                "dimension": {"height": 8, "width": 6},
                "data": "<p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p> <p>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>"
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
