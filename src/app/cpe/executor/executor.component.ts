import {Component, Input, OnChanges} from "@angular/core";
import {Page, Project, Widget} from "src/app/cpe/model/page-data-structure"
import {GridsterConfig, GridsterItem} from "angular-gridster2";
import {Router} from "@angular/router";

@Component({
    selector: "app-executor",
    templateUrl: "./executor.component.html",
    styleUrls: ["./executor.component.scss"]
})
export class ExecutorComponent implements OnChanges {
    @Input() pageStructure: Project;
    @Input() pageId: string;
    headerDashboard: Array<GridsterItem> = [];
    footerDashboard: Array<GridsterItem> = [];
    bodyGridOptions: GridsterConfig;
    bodyDashboard: Array<GridsterItem> = [];
    error: boolean = false;

    constructor(private router: Router) {
    }

    ngOnChanges() {
        let page;
        if (this.pageId) {
            page = this.pageStructure.body.find((page: Page) => page.hasPageID(this.pageId));

            if (!page) {
                this.error = true;
                return;
            } else {
                this.error = false;
            }

        } else {
            page = this.pageStructure.body.find((page: Page) => page.id === this.pageStructure.mainPageID);

            if (page) {
                this.router.navigate(['projects/' + this.pageStructure.id + '/' + page.id]);
            } else {
                page = this.pageStructure.body[0];
            }
        }

        this.headerDashboard = this.buildPagePart(this.pageStructure.header);
        this.bodyDashboard = this.buildPagePart(page.widgets);
        this.footerDashboard = this.buildPagePart(this.pageStructure.footer);

        this.bodyGridOptions = {
          draggable: {
            enabled: false
          },
          resizable: {
            enabled: false
          },
          displayGrid: 'always'
        }

        this.bodyGridOptions.minCols = this.pageStructure.gridDimensions.width;
        this.bodyGridOptions.maxCols = this.pageStructure.gridDimensions.width;
        this.bodyGridOptions.minRows = this.pageStructure.gridDimensions.height;
        this.bodyGridOptions.maxRows = this.pageStructure.gridDimensions.height;

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

}
