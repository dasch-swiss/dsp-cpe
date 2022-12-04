import { Component, OnInit, Input } from '@angular/core';
import { WidgetData, gridCoordinates } from 'src/app/cpe/blue-boxes/model/page-data-structure';

export class testWidgetData extends WidgetData {
  text: string;
  img: string;
  alt: string;
  constructor(id: number, coordinates: gridCoordinates, width: number, height: number, text: string, img: string, alt: string) {
    super(id, coordinates, width, height);
    this.text = text;
    this.img = img;
    this.alt = alt;
  }
}
@Component({
  selector: 'app-test-widget',
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.scss']
})


export class TestWidgetComponent implements OnInit {
  @Input() text: string;
  @Input() img: string;
  @Input() alt: string;
  constructor() { }

  ngOnInit(): void {
    //console.log(this.data.img);
  }

}
