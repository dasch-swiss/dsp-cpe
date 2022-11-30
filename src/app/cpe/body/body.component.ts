import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GridsterConfig, GridsterItem }  from 'angular-gridster2';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnChanges {
  @Input() editMode = false;

  static itemChange(item: any, itemComponent: any) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);
  }

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  constructor() {
    this.options = {
      itemChangeCallback: BodyComponent.itemChange,
      itemResizeCallback: BodyComponent.itemResize,
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false
      },
    };

    this.dashboard = [];
  }

  ngOnInit(): void {
    if(this.options.draggable) {
      this.options.draggable.enabled = this.editMode;
    }

    if(this.options.resizable) {
      this.options.resizable.enabled = this.editMode;
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('edit changed: ', this.editMode);

    if(this.options.draggable) {
      this.options.draggable.enabled = this.editMode;
    }

    if(this.options.resizable) {
      this.options.resizable.enabled = this.editMode;
    }

    this.changedOptions();
  }

  changedOptions() {
    console.log('changed options: ', this.options);
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api?.optionsChanged();
    }
  }

  removeWidget(item: GridsterItem) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addWidget(title: string) {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1, title: title});
  }

}
