import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CpeComponent} from "./cpe.component";
import {NavigationService} from "../routing-module/navigation.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CpeApiService} from "../services/cpe-api.service";
import { Project } from "./model/page-data-structure";

/**
 * mock host component.
 */
@Component({
    template: "<app-cpe></app-cpe>"
})
class MockHostComponent {
    constructor() {
    }
}

describe("CpeComponent", () => {
    let component: CpeComponent;
    let fixture: ComponentFixture<CpeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                CpeComponent
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                CpeApiService,
                NavigationService
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CpeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("should create correct overview if initialized with correct project data", () => {
        component.projects = [new Project("p01", "label 1", "description", "./assets/test.jpg", "page02", {height: 5, width: 5})];
        fixture.detectChanges();
        const elem = fixture.nativeElement.querySelector('div');
        expect(elem.innerHTML.indexOf("label 1")).not.toEqual(-1);
    })
});