import { Component, OnInit, Input } from '@angular/core';
import { WidgetData, gridCoordinates } from 'src/app/cpe/blue-boxes/page-data-structure';

export class anotherTestWidgetData extends WidgetData {
  text: string;
  constructor(id: number, coordinates: gridCoordinates, width: number, height: number, text: string) {
    super(id, coordinates, width, height);
    this.text = text;
  }
}

@Component({
  selector: 'app-another-test-widget',
  templateUrl: './another-test-widget.component.html',
  styleUrls: ['./another-test-widget.component.scss']
})
export class AnotherTestWidgetComponent implements OnInit {
  @Input() text: string;
  constructor() { }

  ngOnInit(): void {
  }

}
