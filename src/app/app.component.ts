import { Component } from '@angular/core';
import { TestWidgetComponent } from './cpe/widgets/test-widget/test-widget.component';
import { Page } from './cpe/blue-boxes/page-data-structure';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dsp-cpe';
  data: Page = {
    header: {
      widgets: []
    },
    body: {
      gridDimensions: {x: 5, y: 5},
      widgets: [
        {
          text: "Halasodsadfj",
          img: "https://picsum.photos/200/300",
          alt: "Test Image", coordinates: {x: 0, y: 1},
          width: 2,
          height: 1,
          id: 194914
        }
      ]
    },
    footer: {
      widgets: []
    }

  }
  //data = {text: "Halasodsadfj", img: "https://picsum.photos/200/300", alt: "Test Image", coordinates: {x: 1, y: 1}, width: 1, height: 1, id: 194914}
}
