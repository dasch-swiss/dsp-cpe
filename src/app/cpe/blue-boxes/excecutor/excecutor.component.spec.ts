import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { anotherTestWidgetData } from '../../widgets/another-test-widget/another-test-widget.component';
import { testWidgetData } from '../../widgets/test-widget/test-widget.component';
import { Page, Header, Body, Footer, PageStructure } from '../model/page-data-structure';

import { ExcecutorComponent } from './excecutor.component';

/**
 * mock host component.
 */
@Component({
  selector: '<app-executor [pageStructure]="data"></app-executor>'
})
class MockHostComponent {
  data: PageStructure;

  getMLS() {
    const w1 = new testWidgetData(1, { x: 0, y: 0 }, 1, 1, '', 'https://picsum.photos/400/200', 'Alt');
    const w2 = new anotherTestWidgetData(2, { x: 0, y: 0 }, 4, 1, 'Musikalisches Lexikon');
    const w3 = new testWidgetData(3, { x: 0, y: 1 }, 2, 3, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.', '', '');
    const w4 = new testWidgetData(4, { x: 0, y: 4 }, 5, 1, 'Footer text', 'https://picsum.photos/100', 'Alt');

    const page = new Page({ x: 5, y: 5 });
    page.header = new Header([w1, w2]);
    page.body = new Body([w3]);
    page.footer = new Footer([w4]);
    return new PageStructure(page);
  }

  constructor() {
    this.data = this.getMLS();
  }
}

describe('ExcecutorComponent', () => {
  let component: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ExcecutorComponent,
        MockHostComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
