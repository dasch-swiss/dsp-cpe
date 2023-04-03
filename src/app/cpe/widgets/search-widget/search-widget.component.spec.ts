import { Component, Input } from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import { GuiElement } from "src/app/gui-elements-module/gui-element";
import { Variant } from "src/app/gui-elements-module/buttons/cpe-button/cpe-button.component";
import {SearchWidgetComponent} from "./search-widget.component";

/**
 * Mock cpe-button
 */
@Component({
    selector: 'cpe-button'
})
class MockCpeButtonComponent extends GuiElement{
    
    @Input() disabled?: boolean;
    @Input() text?: string;
    @Input() variant?: Variant;
}
describe("SearchWidgetComponent", () => {
    let component: SearchWidgetComponent;
    let fixture: ComponentFixture<SearchWidgetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SearchWidgetComponent, MockCpeButtonComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SearchWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
