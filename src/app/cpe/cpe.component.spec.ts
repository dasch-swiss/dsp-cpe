import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpeComponent } from './cpe.component';

/**
 * mock headerComponent.
 */
 @Component({
  selector: '<app-header></app-header>'
})
class MockHeaderComponent { }

/**
 * mock BodyComponent.
 */
 @Component({
  selector: '<app-body></app-body>'
})
class MockBodyComponent { }

/**
 * mock FooterComponent.
 */
 @Component({
  selector: '<app-footer></app-footer>'
})
class MockFooterComponent { }

/**
 * mock CpePlaygroundComponent.
 */
 @Component({
  selector: '<app-cpe-playground></app-cpe-playground>'
})
class MockCpePlaygroundComponent { }

describe('CpeComponent', () => {
  let component: CpeComponent;
  let fixture: ComponentFixture<CpeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CpeComponent,
        MockHeaderComponent,
        MockBodyComponent,
        MockFooterComponent,
        MockCpePlaygroundComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
