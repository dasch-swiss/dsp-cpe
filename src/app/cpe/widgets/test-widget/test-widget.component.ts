import { Component, OnInit, Input } from '@angular/core';
import { WidgetData } from 'src/app/cpe/blue-boxes/page-data-structure'

export interface testWidgetData extends WidgetData {
  text: string,
  img: string,
  alt: string
}
@Component({
  selector: 'app-test-widget',
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.scss']
})


export class TestWidgetComponent implements OnInit {
  @Input() data: testWidgetData;
  constructor() { }

  ngOnInit(): void {
    console.log(this.data.img);
  }

}
