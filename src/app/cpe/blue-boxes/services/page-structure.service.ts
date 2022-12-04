import { Injectable } from '@angular/core';
import {testWidgetData} from "../../widgets/test-widget/test-widget.component";
import {Body, Footer, Header, Page, PageStructure} from "../model/page-data-structure";
import {anotherTestWidgetData} from "../../widgets/another-test-widget/another-test-widget.component";

@Injectable({
  providedIn: 'root'
})
export class PageStructureService {

  constructor() { }

  getMLS() {
    const widget1 = new testWidgetData(1, { x: 1, y: 0 }, 4, 2, "Hallo", "https://picsum.photos/200/300", "Alt");
    const widget2 = new anotherTestWidgetData(2, { x: 3, y: 2 }, 1, 3, "Hallo");

    const page = new Page();
    page.header = new Header([]);
    page.body = new Body([widget1, widget2], { x: 5, y: 5 });
    page.footer = new Footer([]);
    return new PageStructure(page);
  }

  getBeol() {
    const widget1 = new testWidgetData(1, { x: 1, y: 0 }, 4, 2, "Hallo", "https://picsum.photos/200/300", "Alt");
    const widget2 = new anotherTestWidgetData(2, { x: 3, y: 2 }, 1, 3, "Hallo");

    const page = new Page();
    page.header = new Header([]);
    page.footer = new Footer([]);
    return new PageStructure(page);
  }

  getWordWeb() {
    const widget1 = new testWidgetData(1, { x: 1, y: 0 }, 4, 2, "Hallo", "https://picsum.photos/200/300", "Alt");
    const widget2 = new anotherTestWidgetData(2, { x: 3, y: 2 }, 1, 3, "Hallo");

    const page = new Page();
    page.body = new Body([widget1, widget2], { x: 5, y: 5 });
    return new PageStructure(page);
  }
}
