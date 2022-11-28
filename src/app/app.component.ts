import { Component } from '@angular/core';
import { TestWidgetComponent, testWidgetData } from './cpe/widgets/test-widget/test-widget.component';
import { Page, Header, Footer, Body } from './cpe/blue-boxes/page-data-structure';
import { anotherTestWidgetData } from './cpe/widgets/another-test-widget/another-test-widget.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dsp-cpe';
  widget = new testWidgetData(1, { x: 1, y: 0 }, 4, 2, "Hallo", "https://picsum.photos/200/300", "Alt");
  widget2 = new anotherTestWidgetData(2, { x: 3, y: 2 }, 1, 3, "Hallo");
  header = new Header([]);
  footer = new Footer([]);
  body = new Body([this.widget, this.widget2], { x: 5, y: 5 });
  data = new Page(this.header, this.body, this.footer);
  //data = {text: "Halasodsadfj", img: "https://picsum.photos/200/300", alt: "Test Image", coordinates: {x: 1, y: 1}, width: 1, height: 1, id: 194914}
}
