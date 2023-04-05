import {TestBed} from "@angular/core/testing";
import { Project, Page, Header, Footer, Widget } from "../model/page-data-structure";

import {PageStructureValidatorService} from "./page-structure-validator.service";

describe("PageStructureValidatorService", () => {
    let service: PageStructureValidatorService;
    let testData: Project;
    const testPage = new Page("page01", "label for page");
    testPage.widgets = [new Widget("w02", "wt-003", {x: 0, y: 1}, {height: 2, width: 2}, "nothing")];
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PageStructureValidatorService);
        testData = new Project("p-001", "label 1", "description", "image 1", "page-001", {height: 6, width: 6});
        testData.header = new Header("H01", "Test title", "test-logo.jpg", false);
        testData.footer = new Footer("F01", "Test Footer");
        const testPage = new Page("page01", "label for page");
        testPage.widgets = [new Widget("w02", "wt-003", {x: 0, y: 1}, {height: 2, width: 2}, "nothing")];
        testData.body = [testPage];
       
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should fail if a grid dimension of the project is negative", () => {
        testData.gridDimensions.width = -1;
        expect(() => service.validate(testData)).toThrowError("Grid dimension values of page are invalid");
    });

    it("should fail if a grid dimension of the project is 0", () => {
        testData.gridDimensions.height = 0;
        expect(() => service.validate(testData)).toThrowError("Grid dimension values of page are invalid");
    });

    it("should fail if a grid dimension is smaller than allowed", () => {
        testData.gridDimensions.height = service.MIN_GRID_DIMENSION.height - 1;
        expect(() => service.validate(testData)).toThrowError("Size of page have wrong dimensions");
    });

    it("should fail if a grid dimension is larger than allowed", () => {
        testData.gridDimensions.width = service.MAX_GRID_DIMENSION.width + 1;
        expect(() => service.validate(testData)).toThrowError("Size of page have wrong dimensions");
    });

    it("should fail if there is no page for the project", () => {
        testData.body = [];
        expect(() => service.validate(testData)).toThrowError("It should have at least a page in the body");
    });

    it("should fail if there is a widget in the project with negative numbers as a dimension", () => {
        const widget1 = new Widget("w03", "wt-003", {x: 0, y: 1}, {height: -1, width: 2}, "nothing");
        testData.body[0].widgets.push(widget1);
        expect(() => service.validate(testData)).toThrowError("Grid dimension values of widget are invalid");
    });

    it("should fail if there is a widget in the project with 0 as a dimension", () => {
        const widget1 = new Widget("w03", "wt-003", {x: 0, y: 1}, {height: 2, width: 0}, "nothing");
        testData.body[0].widgets.push(widget1);
        expect(() => service.validate(testData)).toThrowError("Grid dimension values of widget are invalid");
    });
    
    /**
     * This test is is not needed as it is tested by above tests if the MIN_WIDGET_DIMENSION is {1, 1}
     */
    //it("should fail if a widget dimension is larger than allowed", () => {
        
    //});

    it("should fail if there is a widget with negative coordinates", () => {
        const widget1 = new Widget("w03", "wt-003", {x: -1, y: 1}, {height: 2, width: 2}, "nothing");
        testData.body[0].widgets.push(widget1);
        expect(() => service.validate(testData)).toThrowError("Coordinates of the widget are invalid");
    });

    it("should fail if the a dimension is placed out of bounds for a widget", () => {
        const widget1 = new Widget("w03", "wt-003", {x: 1, y: 1}, {height: 6, width: 2}, "nothing");
        testData.body[0].widgets.push(widget1);
        expect(() => service.validate(testData)).toThrowError("Size of the widget are out of bounds");
    });

    it("should pass with correct data", () => {
        expect(() => service.validate(testData)).not.toThrowError();
    });

});