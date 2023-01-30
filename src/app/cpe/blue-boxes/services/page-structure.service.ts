import { Injectable } from '@angular/core';
import {testWidgetData} from '../../widgets/test-widget/test-widget.component';
import {Body, Footer, Header, Page, PageStructure} from '../model/page-data-structure';
import {anotherTestWidgetData} from '../../widgets/another-test-widget/another-test-widget.component';
import {SearchWidgetData} from "../../widgets/search-widget/search-widget.component";
import {ResultWidgetData} from "../../widgets/result-widget/result-widget.component";

@Injectable({
  providedIn: 'root'
})
export class PageStructureService {

  constructor() { }

  getMLS() {
    const w1 = new testWidgetData(1, { x: 0, y: 0 }, 1, 1, '', 'https://picsum.photos/400/200', 'Alt');
    const w2 = new anotherTestWidgetData(2, { x: 1, y: 0 }, 4, 1, 'Musikalisches Lexikon');
    const search_w = new SearchWidgetData(5, {x: 0, y: 1}, 2,3);
    const result_w = new ResultWidgetData(6, {x: 3, y: 1}, 3, 3);
    const w4 = new testWidgetData(4, { x: 0, y: 4 }, 5, 1, 'Footer text', 'https://picsum.photos/100', 'Alt');

    const page = new Page({ x: 5, y: 5 });
    page.header = new Header([w1, w2]);
    page.body = new Body([search_w, result_w]);
    page.footer = new Footer([w4]);
    return new PageStructure(page);
  }

  getBeol() {
    const w1 = new anotherTestWidgetData(1, { x: 0, y: 0 }, 3, 1, 'BEOL - Bernoulli Euler Online');
    const w2 = new testWidgetData(2, { x: 0, y: 2 }, 3, 1, 'Footer text', 'https://picsum.photos/700/300', 'Alt');

    const page = new Page({ x: 3, y: 3});
    page.header = new Header([w1]);
    page.footer = new Footer([w2]);
    return new PageStructure(page);
  }

  getWordWeb() {
    const w1 = new anotherTestWidgetData(1, { x: 1, y: 0 }, 3, 1, 'WordWeb');
    const w2 = new testWidgetData(2, { x: 0, y: 0 }, 1, 4, 'WordWeb text 1', 'https://picsum.photos/200/300', 'Alt');
    const w3 = new testWidgetData(3, { x: 2, y: 1 }, 3, 3, 'WordWeb text 2', 'https://picsum.photos/400/300', 'Alt');

    const page = new Page({ x: 4, y: 4 });
    page.body = new Body([w1, w2, w3]);
    return new PageStructure(page);
  }
}
