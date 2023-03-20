import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Component} from "@angular/core";

/**
 * mock host component.
 */
@Component({
    template: '<app-footer-widget [data]="data"></app-footer-widget>'
})
class MockHostComponent {
    data: any;

    constructor() {
        this.data = "This is a footer";
    }
}

describe("FooterWidgetComponent", () => {
    let component: MockHostComponent;
    let fixture: ComponentFixture<MockHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MockHostComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MockHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
