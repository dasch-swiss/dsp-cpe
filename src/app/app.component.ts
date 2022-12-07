import { Component } from '@angular/core';
import { testWidgetData } from './cpe/widgets/test-widget/test-widget.component';
import { Page, Header, Footer, Body } from './cpe/blue-boxes/page-data-structure';
import { anotherTestWidgetData } from './cpe/widgets/another-test-widget/another-test-widget.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dsp-cpe';
  widget = new testWidgetData(1, { x: 0, y: 0 }, 3, 2, "Test Widget 1", "https://picsum.photos/200/300", "Alt");
  widget2 = new anotherTestWidgetData(2, { x: 3, y: 0 }, 2, 5, "Test Widget 2");
  headerWidget = new testWidgetData(3, {x: 1, y: 0}, 2, 1, "Header Widget", "https://picsum.photos/200/300", "Alt header");
  footerWidget = new anotherTestWidgetData(4, { x: 0, y: 0 }, 1, 1, "Footer Widget");
  header = new Header([this.headerWidget]);
  footer = new Footer([this.footerWidget]);
  body = new Body([this.widget, this.widget2], { x: 5, y: 5 });
  data = new Page(this.header, this.body, this.footer);
}
