import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpePlaygroundComponent } from './cpe-playground.component';

describe('CpePlaygroundComponent', () => {
  let component: CpePlaygroundComponent;
  let fixture: ComponentFixture<CpePlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpePlaygroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpePlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
