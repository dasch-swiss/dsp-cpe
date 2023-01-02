import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcecutorComponent } from './excecutor.component';

describe('ExcecutorComponent', () => {
  let component: ExcecutorComponent;
  let fixture: ComponentFixture<ExcecutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcecutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcecutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
