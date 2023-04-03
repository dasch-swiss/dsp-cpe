import {Component, Input} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Page, Project, Widget, Header, Footer} from "../model/page-data-structure";
import {ComponentCommunicationService, Events} from "../../services/component-communication.service";
import { Status } from "src/app/services/component-communication.service";
import { GridsterModule } from "angular-gridster2";
import { ExecutorComponent } from "./executor.component";
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
/**
 * Mock image widget
 */
@Component({
    selector: 'app-image-widget'
})
class MockImageWidgetComponent {
    @Input() data: any;
 }

/**
 * Mock text widget
 */
 @Component({
    selector: 'app-text-widget'
})
class MockTextWidgetComponent {
    @Input() text: string;
 }

/**
 * Mock search widget
 */
 @Component({
    selector: 'app-search-widget'
})
class MockSearchWidgetComponent { }
/**
 * Mock result widget
 */
 @Component({
    selector: 'app-result-widget'
})
class MockResultWidgetComponent { }
/**
 * Mock header widget
 */
 @Component({
    selector: 'app-header-widget'
})
class MockHeaderWidgetComponent { 
    @Input() data: any;
}
/**
 * Mock footer widget
 */
 @Component({
    selector: 'app-footer-widget'
})
class MockFooterWidgetComponent {
    @Input() data: any;
 }
/**
 * mock host component.
 */
@Component({
    template: `
    <app-executor [pageID]="pageID" [pageStructure]="data"></app-executor>
  `})
class MockHostComponent {
    data: Project;
    pageID: string | undefined;

    constructor(public communicationService: ComponentCommunicationService) {
        this.data = new Project("p01", "label 1", "description", "./assets/test.jpg", "page02", {height: 5, width: 5});
        this.data.header = new Header("H01", "Test title", "test-logo.jpg", false);
        const testPage = new Page("page01", "label for page");
        const testPage2 = new Page("page02", "label for page2");
        testPage.widgets = [new Widget("w02", "wt-003", {x: 0, y: 1}, {height: 2, width: 2}, "nothing")];
        this.data.body = [testPage, testPage2];
        this.data.footer = new Footer("F01", "Test Footer");
        this.pageID = "page01";
    }
}

describe("ExecutorComponent", () => {
    let component: MockHostComponent;
    let fixture: ComponentFixture<MockHostComponent>;
    let router: Router;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ExecutorComponent,
                MockHostComponent,
                MockImageWidgetComponent,
                MockTextWidgetComponent,
                MockSearchWidgetComponent,
                MockResultWidgetComponent,
                MockHeaderWidgetComponent,
                MockFooterWidgetComponent
            ],
            imports: [
                GridsterModule
            ],
            providers: [
                Router
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MockHostComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have show-grid class when 'showGrid' Event was emitted", () => {
        component.communicationService.emit({event: Events.showGrid, status: Status.finished});
        fixture.detectChanges();
        const gridsterElement = fixture.nativeElement.querySelector('gridster');
        expect(gridsterElement.classList).toContain('show-grid');
    });

    it("should display header, footer and body given a correct pageID", () => {
        /* Test if header is setup correctly */
        const header = fixture.nativeElement.querySelector('app-header-widget');
        expect(header).toBeTruthy();
        const headerComp = fixture.debugElement.query(
            By.directive(MockHeaderWidgetComponent)
          ).componentInstance;
        expect(headerComp.data.title).toEqual("Test title");
        expect(headerComp.data.logo).toEqual("test-logo.jpg");

        /* Test if footer is setup correctly */
        const footer = fixture.nativeElement.querySelector('app-footer-widget');
        expect(footer).toBeTruthy();
        const footerComp = fixture.debugElement.query(
            By.directive(MockFooterWidgetComponent)
          ).componentInstance;
        expect(footerComp.data.data).toEqual("Test Footer");

        /* Test that the gridster is loaded */
        const gridsterElement = fixture.nativeElement.querySelector('gridster');
        expect(gridsterElement).toBeTruthy();
    });

    it("should display error message with a wrong pageID", () => {
        component.pageID = "INVALID";
        fixture.detectChanges();
        // Test that the gridster container contains the error message
        expect(fixture.debugElement.query(By.css('.gridster-container')).nativeElement.innerHTML.indexOf("The page couldn't be displayed.")).not.toEqual(-1);
    });

    it("should redirect if there is no pageID but a mainPageId is defined", () => {
        const navigateSpy = spyOn(router, 'navigate');
        component.pageID = undefined;
        fixture.detectChanges();
        expect(navigateSpy).toHaveBeenCalledWith(["projects/" + component.data.id + "/" + component.data.mainPageID]);
    });

    it("should redirect to first page if there is no pageID and no (or an invalid) mainPageId defined", () => {
        const navigateSpy = spyOn(router, 'navigate');
        component.pageID = undefined;
        component.data.mainPageID = "undefined";
        fixture.detectChanges();
        expect(navigateSpy).toHaveBeenCalledWith(["projects/" + component.data.id + "/" + component.data.body[0].id]);
    });

    it("should create a TextWidget if the data requires it", () => {
        const testPage3 = new Page("page03", "label for page3");
        testPage3.widgets = [new Widget("w03", "text", {x: 2, y: 3}, {height: 1, width: 1}, "Test text")];
        component.data.body.push(testPage3);
        component.pageID = "page03";
        fixture.detectChanges();
        const elem = fixture.nativeElement.querySelector('app-text-widget');
        expect(elem).toBeTruthy();
        const elemComp = fixture.debugElement.query(
            By.directive(MockTextWidgetComponent)
          ).componentInstance;
        expect(elemComp.text).toEqual("Test text");
    });

    it("should create a ImageWidget if the data requires it", () => {
        const testPage3 = new Page("page03", "label for page3");
        testPage3.widgets = [new Widget("w03", "image", {x: 2, y: 3}, {height: 1, width: 1}, "Test image")];
        component.data.body.push(testPage3);
        component.pageID = "page03";
        fixture.detectChanges();
        const elem = fixture.nativeElement.querySelector('app-image-widget');
        expect(elem).toBeTruthy();
        const elemComp = fixture.debugElement.query(
            By.directive(MockImageWidgetComponent)
          ).componentInstance;
        expect(elemComp.data).toEqual("Test image");
    });

    it("should create a SearchWidget if the data requires it", () => {
        const testPage3 = new Page("page03", "label for page3");
        testPage3.widgets = [new Widget("w03", "search", {x: 2, y: 3}, {height: 1, width: 1}, "None")];
        component.data.body.push(testPage3);
        component.pageID = "page03";
        fixture.detectChanges();
        const elem = fixture.nativeElement.querySelector('app-search-widget');
        expect(elem).toBeTruthy();
    });

    it("should create a ResultWidget if the data requires it", () => {
        const testPage3 = new Page("page03", "label for page3");
        testPage3.widgets = [new Widget("w03", "result", {x: 2, y: 3}, {height: 1, width: 1}, "None")];
        component.data.body.push(testPage3);
        component.pageID = "page03";
        fixture.detectChanges();
        const elem = fixture.nativeElement.querySelector('app-result-widget');
        expect(elem).toBeTruthy();
    });
});
