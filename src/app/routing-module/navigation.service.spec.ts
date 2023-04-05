import {fakeAsync, flush, TestBed, tick} from "@angular/core/testing";
import { Route, Router, RouterModule } from "@angular/router";
import { of } from "rxjs";
import { Page, Project } from "../cpe/model/page-data-structure";
import { CpeApiService } from "../services/cpe-api.service";
import { NavigationService } from "./navigation.service";

describe("NavigationService", () => {
    let service: NavigationService;
    let mockApiService: jasmine.SpyObj<CpeApiService>;
    let router: Router;
    beforeEach(async () => {
        mockApiService = jasmine.createSpyObj(['getProject']);
        mockApiService.getProject.and.returnValue(of(new Project("p-001", "label 1", "description", "image 1", "page-001", {height: 6, width: 6})));
        await TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([])
            ],
            providers: [ { provide: CpeApiService, useValue: mockApiService }, Router ]
        }).compileComponents();
        router = TestBed.inject(Router);
        service = TestBed.inject(NavigationService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should navigate to projects page if navigateToProjectsPage is called", () => {
        const navigateSpy = spyOn(router, 'navigate');
        service.navigateToProjectsPage();
        expect(navigateSpy).toHaveBeenCalledWith(["projects"], jasmine.any(Object));
    });

    it("should navigate to a specific project page if navigateToProject is called", () => {
        const navigateSpy = spyOn(router, 'navigate');
        service.navigateToProject('test');
        expect(navigateSpy).toHaveBeenCalledWith(["projects/test"], jasmine.any(Object));
    });
    it ("should throw error if navigateToProjectsPage is called and the api call fails", fakeAsync(() => {
        mockApiService.getProject.and.throwError("Test error");
        try {
            service.navigateToPage("test", "test");
            flush();
            tick();
            fail("Expected error to be thrown");
        } catch(error) {
            expect(error).toEqual(new Error("Test error"));
        }
    }));

    it("should throw error if navigateToProjectsPage is called with invalid pageID", fakeAsync(() => {
        try {
            service.navigateToPage("test", "INVALID");
            flush();
            tick();
            fail("Expected error to be thrown");
        } catch(error) {
            expect(error).toEqual(new Error("No page on this project with that ID was found"));
        }
    }));

    it("should navigate to page if navigateToProjectsPage is called with correct data", fakeAsync(() => {
        const navigateSpy = spyOn(router, 'navigate');
        const testData = new Project("p-001", "label 1", "description", "image 1", "page-001", {height: 6, width: 6});
        const testPage = new Page("page01", "label for page");
        testData.body = [testPage];
        mockApiService.getProject.and.returnValue(of(testData));
        service.navigateToPage("p-001", "page01");
        flush();
        tick();
        expect(navigateSpy).toHaveBeenCalledWith(["projects/p-001/page01"], jasmine.any(Object));
    }));
    
});