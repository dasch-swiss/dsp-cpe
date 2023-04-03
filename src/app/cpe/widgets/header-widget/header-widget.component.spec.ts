import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Component} from "@angular/core";
import { HeaderWidgetComponent } from "./header-widget.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";

/**
 * mock host component.
 */
@Component({
    template: '<app-header-widget [data]="data"></app-header-widget>'
})
class MockHostComponent {
    data: any;

    constructor() {
        this.data = "This is a Header";
    }
}

describe("HeaderWidgetComponent", () => {
    let component: MockHostComponent;
    let fixture: ComponentFixture<MockHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MockHostComponent, HeaderWidgetComponent],
            providers: [{provide: ActivatedRoute, useValue: {
                params: of({id: '123'})
            }}],
            imports: [HttpClientTestingModule]
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
