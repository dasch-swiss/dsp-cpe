import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Project} from "../model/page-data-structure";
import {ExecutorComponent} from "./executor.component";

/**
 * mock host component.
 */
@Component({
    template: "<app-executor [pageId]=\"pageID\" [pageStructure]=\"data\"></app-executor>"
})
class MockHostComponent {
    data: Project;
    pageID: string

    constructor() {
        this.data = new Project("p01", "label 1", "description", "p1");
        this.pageID = "";
    }
}

describe("ExcecutorComponent", () => {
    let component: MockHostComponent;
    let fixture: ComponentFixture<MockHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ExecutorComponent,
                MockHostComponent
            ]
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
