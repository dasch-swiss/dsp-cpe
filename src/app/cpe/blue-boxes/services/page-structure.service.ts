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
    const w1 = new testWidgetData(1, { x: 0, y: 0 }, 5, 1, "MLS text 1", "https://picsum.photos/200/300", "Alt");
    const w2 = new anotherTestWidgetData(2, { x: 1, y: 1 }, 1, 3, "MLS title 1");
    const w3 = new testWidgetData(3, { x: 0, y: 1 }, 5, 1, "MLS text 2", "https://picsum.photos/100", "Alt");

    const page = new Page({ x: 5, y: 5 });
    page.header = new Header([w1]);
    page.body = new Body([w2]);
    page.footer = new Footer([w3]);
    return new PageStructure(page);
  }

  getBeol() {
    const widget1 = new testWidgetData(1, { x: 1, y: 0 }, 4, 1, "BEOL text 1", "https://picsum.photos/200/300", "Alt");
    const widget2 = new anotherTestWidgetData(2, { x: 3, y: 2 }, 1, 1, "BEOL title 1");

    const page = new Page({ x: 5, y: 3});
    page.header = new Header([widget1]);
    page.footer = new Footer([widget2]);
    return new PageStructure(page);
  }

  getWordWeb() {
    const widget1 = new testWidgetData(1, { x: 1, y: 0 }, 4, 2, "WordWeb text 1", "https://picsum.photos/200/300", "Alt");
    const widget2 = new anotherTestWidgetData(2, { x: 3, y: 2 }, 1, 3, "WordWeb title 1");

    const page = new Page({ x: 5, y: 5 });
    page.body = new Body([widget1, widget2]);
    return new PageStructure(page);
  }
}
