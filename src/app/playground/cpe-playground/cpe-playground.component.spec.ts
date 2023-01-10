import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Variant } from 'src/app/gui-elements-module/buttons/cpe-button/cpe-button.component';

import { CpePlaygroundComponent } from './cpe-playground.component';

/**
 * mock CpeButtonComponent.
 */
 @Component({
  selector: '<cpe-button></cpe-button>'
})
class MockCpeButtonComponent {
  @Input() disabled? = false;

  @Input() text? = '';

  @Input() variant?: Variant  = 'Primary';
}

describe('CpePlaygroundComponent', () => {
  let component: CpePlaygroundComponent;
  let fixture: ComponentFixture<CpePlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CpePlaygroundComponent,
        MockCpeButtonComponent
      ]
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
