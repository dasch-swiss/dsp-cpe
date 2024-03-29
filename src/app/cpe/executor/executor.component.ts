import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {Page, Project, Widget} from "src/app/cpe/model/page-data-structure"
import {GridsterConfig, GridsterItem} from "angular-gridster2";
import {Router} from "@angular/router";
import {ComponentCommunicationService, Events} from "../../services/component-communication.service";

@Component({
    selector: "app-executor",
    templateUrl: "./executor.component.html"
})
export class ExecutorComponent implements OnChanges, OnInit {
    @Input() pageStructure: Project;
    @Input() pageID: string;
    bodyGridOptions: GridsterConfig;
    bodyDashboard: Array<GridsterItem> = [];
    header: any;
    footer: any;
    error: boolean = false;
    showGrid: boolean = false;

    constructor(private router: Router, private _communicationService: ComponentCommunicationService) {
    }

    ngOnInit() {
        this._communicationService.on(Events.showGrid, _ => {
                this.showGrid = !this.showGrid;
            }, () => {}, _ => {}
        );
    }

    ngOnChanges() {
        let page;
        if (this.pageID) {
            page = this.pageStructure.body.find((page: Page) => page.hasPageID(this.pageID));

            if (!page) {
                this.error = true;
                this.header = this.getHeader(this.pageStructure);
                this.footer = this.getFooter(this.pageStructure);
                return;
            } else {
                this.error = false;
            }

        } else {
            page = this.pageStructure.body.find((page: Page) => page.id === this.pageStructure.mainPageID);
            if (page) {    
                this.router.navigate(["projects/" + this.pageStructure.id + "/" + page.id]);
            } else {
                page = this.pageStructure.body[0];
                this.router.navigate(["projects/" + this.pageStructure.id + "/" + page.id]);   
            }
        }

        this.header = this.getHeader(this.pageStructure);
        this.bodyDashboard = this.buildPagePart(page.widgets);
        this.footer = this.getFooter(this.pageStructure);

        this.bodyGridOptions = {
            draggable: {
                enabled: false
            },
            resizable: {
                enabled: false
            },
            displayGrid: "none",
            minCols: this.pageStructure.gridDimensions.width,
            maxCols: this.pageStructure.gridDimensions.width,
            minRows: this.pageStructure.gridDimensions.height,
            maxRows: this.pageStructure.gridDimensions.height
        }

    }

    buildPagePart(pagePart: Widget[]): Array<GridsterItem> {
        const dashboard = [];
        for (let x = 0; x < pagePart.length; x++) {
            const widget = pagePart[x];
            dashboard.push({
                x: widget.coordinates.x,
                y: widget.coordinates.y,
                cols: widget.dimension.width,
                rows: widget.dimension.height,
                type: widget.widgetType,
                data: widget.data
            });
        }
        return dashboard;
    }

    getHeader(project: Project) {
        return {
            project: project.id,
            title: project.header.title,
            logo: project.header.logo,
            login: project.header.login,
            pages: project.body
        }
    }

    getFooter(project: Project) {
        return {
            project: project.id,
            data: project.footer.data
        }
    }

}
