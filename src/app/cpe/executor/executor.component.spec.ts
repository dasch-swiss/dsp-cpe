import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Page, Project, Widget} from "../model/page-data-structure";

/**
 * mock host component.
 */
@Component({
    template: '<app-executor [pageId]="pageID" [pageStructure]="data"></app-executor>'
})
class MockHostComponent {
    data: Project;
    pageID: string

    constructor() {
        this.data = new Project("p01", "label 1", "description", "p1", {height: 5, width: 5});
        this.data.header = {
            "id": "H01",
            "title": "Test title",
            "logo": "test-logo.jpg",
            "login": false
        };
        const testPage = new Page("page01", "label for page");
        testPage.widgets = [new Widget("w02", "wt-003", {x: 0, y: 1}, {height: 2, width: 5}, "nothing")];
        this.data.body = [testPage];
        this.pageID = "page01";
    }
}

describe("ExecutorComponent", () => {
    let component: MockHostComponent;
    let fixture: ComponentFixture<MockHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
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
