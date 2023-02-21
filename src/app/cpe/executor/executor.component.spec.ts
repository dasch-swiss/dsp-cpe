import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Page, Project, Widget} from "../model/page-data-structure";
import {ExecutorComponent} from "./executor.component";

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
        this.data.header = [new Widget("w01", "wt-003", {x: 0, y: 0}, {height: 1, width: 1}, "nothing")];
        const testPage = new Page("page01");
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