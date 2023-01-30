import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultWidgetComponent } from './result-widget.component';

describe('ResultWidgetComponent', () => {
  let component: ResultWidgetComponent;
  let fixture: ComponentFixture<ResultWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
