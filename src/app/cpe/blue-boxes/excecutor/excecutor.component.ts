import { Component, OnInit, Input } from '@angular/core';
import { PagePart, PageStructure } from 'src/app/cpe/blue-boxes/model/page-data-structure'
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { testWidgetData } from '../../widgets/test-widget/test-widget.component';
import { anotherTestWidgetData } from '../../widgets/another-test-widget/another-test-widget.component';
@Component({
  selector: 'app-excecutor',
  templateUrl: './excecutor.component.html',
  styleUrls: ['./excecutor.component.scss']
})
export class ExcecutorComponent implements OnInit {
  @Input() pageStructure: PageStructure;
  headerDashboard: Array<GridsterItem> = [];
  footerGridOptions: GridsterConfig;
  footerDashboard: Array<GridsterItem> = [];
  bodyGridOptions: GridsterConfig;
  bodyDashboard: Array<GridsterItem> = [];
  constructor() {
  }

  ngOnInit(): void {
    this.headerDashboard = this.pageStructure.page.header ? this.buildPagePart(this.pageStructure.page.header): [];
    this.bodyDashboard = this.pageStructure.page.body ? this.buildPagePart(this.pageStructure.page.body): [];
    this.footerDashboard = this.pageStructure.page.footer ? this.buildPagePart(this.pageStructure.page.footer): [];

    this.bodyGridOptions = {
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false
      },
      displayGrid: 'always'
    }
    if (this.pageStructure.page.body) {
      this.bodyGridOptions.minCols = this.pageStructure.page.gridDimensions.x;
      this.bodyGridOptions.maxCols = this.pageStructure.page.gridDimensions.x;
      this.bodyGridOptions.minRows = this.pageStructure.page.gridDimensions.y;
      this.bodyGridOptions.maxRows = this.pageStructure.page.gridDimensions.y;
    }
  }

  buildPagePart(pagePart: PagePart): Array<GridsterItem> {
    const dashboard = [];
    for (let x = 0; x < pagePart.widgets.length; x++) {
      const widget = pagePart.widgets[x];
      if (widget instanceof testWidgetData) {
        dashboard.push({ x: widget.coordinates.x, y: widget.coordinates.y, cols: widget.width, rows: widget.height, text: widget.text, img: widget.img, alt: widget.alt, type: 'test-widget' });
      }
      if (widget instanceof anotherTestWidgetData) {
        dashboard.push({ x: widget.coordinates.x, y: widget.coordinates.y, cols: widget.width, rows: widget.height, text: widget.text, type: 'another-test-widget' });
      }
    }
    return dashboard;
  }

}
