import {Component, OnInit, Input} from "@angular/core";
import {Page, Project, Widget} from "src/app/cpe/model/page-data-structure"
import {GridsterConfig, GridsterItem} from "angular-gridster2";
import {Router} from "@angular/router";

@Component({
    selector: "app-executor",
    templateUrl: "./executor.component.html",
    styleUrls: ["./executor.component.scss"]
})
export class ExecutorComponent implements OnInit {
    @Input() pageStructure: Project;
    @Input() pageId: string;
    headerDashboard: Array<GridsterItem> = [];
    footerGridOptions: GridsterConfig;
    footerDashboard: Array<GridsterItem> = [];
    bodyGridOptions: GridsterConfig;
    bodyDashboard: Array<GridsterItem> = [];

    constructor(private router: Router) {
    }

    ngOnInit() {
        let page;
        if (this.pageId) {
            page = this.pageStructure.pages.find((page: Page) => page.hasPageID(this.pageId));

            if (!page) {
                // ToDo show page error
                return;
            }

        } else {
            page = this.pageStructure.pages.find((page: Page) => page.id === this.pageStructure.mainPageID);

            if (page) {
                this.router.navigate(['projects/' + this.pageStructure.id + '/' + page.id]);
            } else {
                page = this.pageStructure.pages[0];
            }
        }

        this.headerDashboard = this.buildPagePart(page.header);
        this.bodyDashboard = this.buildPagePart(page.body);
        this.footerDashboard = this.buildPagePart(page.footer);

        this.bodyGridOptions = {
          draggable: {
            enabled: false
          },
          resizable: {
            enabled: false
          },
          displayGrid: 'always'
        }
        if (page?.body) {
          this.bodyGridOptions.minCols = page?.gridDimensions.width;
          this.bodyGridOptions.maxCols = page?.gridDimensions.width;
          this.bodyGridOptions.minRows = page?.gridDimensions.height;
          this.bodyGridOptions.maxRows = page?.gridDimensions.height;
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

}
