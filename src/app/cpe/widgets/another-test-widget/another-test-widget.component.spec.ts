import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherTestWidgetComponent } from './another-test-widget.component';

describe('AnotherTestWidgetComponent', () => {
  let component: AnotherTestWidgetComponent;
  let fixture: ComponentFixture<AnotherTestWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnotherTestWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotherTestWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
