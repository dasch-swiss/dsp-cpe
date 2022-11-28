import { Component, OnInit, Input } from '@angular/core';
import {Page} from 'src/app/cpe/blue-boxes/page-data-structure'
import { GridsterConfig, GridsterItem }  from 'angular-gridster2';
import { TestWidgetComponent, testWidgetData } from '../../widgets/test-widget/test-widget.component';
@Component({
  selector: 'app-excecutor',
  templateUrl: './excecutor.component.html',
  styleUrls: ['./excecutor.component.scss']
})
export class ExcecutorComponent implements OnInit {
  @Input() page: Page;
  gridsterOptions: GridsterConfig;
  bodyDashboard : Array<GridsterItem> = [];
  constructor() {
    this.gridsterOptions = {draggable: {
      enabled: false
    },
    resizable: {
      enabled: false
    }
   }
  }

  ngOnInit(): void {
    this.buildBody();
  }
  buildBody(): void {
    for (let x = 0; x < this.page.body.widgets.length; x++){
      const widget = this.page.body.widgets[x] as testWidgetData;
      this.bodyDashboard.push({x: widget.coordinates.x, y: widget.coordinates.y, cols: widget.width, rows: widget.height, text: widget.text, img: widget.img, alt: widget.alt})
    }
    console.log(this.bodyDashboard);
  }

}
