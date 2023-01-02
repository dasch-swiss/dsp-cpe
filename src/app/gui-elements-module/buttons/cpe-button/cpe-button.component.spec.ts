import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpeButtonComponent } from './cpe-button.component';

describe('CpeButtonComponent', () => {
  let component: CpeButtonComponent;
  let fixture: ComponentFixture<CpeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpeButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
