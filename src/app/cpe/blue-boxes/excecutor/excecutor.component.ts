import { Component, OnInit, Input } from '@angular/core';
import { Page, PagePart } from 'src/app/cpe/blue-boxes/page-data-structure'
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { testWidgetData } from '../../widgets/test-widget/test-widget.component';
import { anotherTestWidgetData } from '../../widgets/another-test-widget/another-test-widget.component';
@Component({
  selector: 'app-excecutor',
  templateUrl: './excecutor.component.html',
  styleUrls: ['./excecutor.component.scss']
})
export class ExcecutorComponent implements OnInit {
  @Input() page: Page;
  headerFooterGridOptions: GridsterConfig = {
    draggable: {
      enabled: false
    },
    resizable: {
      enabled: false
    },
    minCols: 3,
    maxCols: 3,
    minRows: 1,
    maxRows: 1
  }
  headerDashboard: Array<GridsterItem> = [];
  footerDashboard: Array<GridsterItem> = [];
  bodyGridOptions: GridsterConfig;
  bodyDashboard: Array<GridsterItem> = [];
  constructor() {
  }

  ngOnInit(): void {
    this.headerDashboard = this.buildPagePart(this.page.header);
    this.bodyDashboard = this.buildPagePart(this.page.body);
    this.footerDashboard = this.buildPagePart(this.page.footer);
    this.bodyGridOptions = {
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false
      },
      minCols: this.page.body.gridDimensions.x,
      maxCols: this.page.body.gridDimensions.x,
      minRows: this.page.body.gridDimensions.y,
      maxRows: this.page.body.gridDimensions.y
    }
  }

  buildPagePart(pagePart: PagePart): Array<GridsterItem> {
    const dashboard = [];
    for (let x = 0; x < pagePart.widgets.length; x++) {
      const widget = this.page.body.widgets[x];
      if (widget instanceof testWidgetData) {
        dashboard.push({ x: widget.coordinates.x, y: widget.coordinates.y, cols: widget.width, rows: widget.height, text: widget.text, img: widget.img, alt: widget.alt, type: "test-widget" });
      }
      if (widget instanceof anotherTestWidgetData) {
        dashboard.push({ x: widget.coordinates.x, y: widget.coordinates.y, cols: widget.width, rows: widget.height, text: widget.text, type: "another-test-widget" });
      }
    }
    return dashboard;
  }

}
