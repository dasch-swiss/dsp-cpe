import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CpeComponent} from "./cpe.component";
import {ProjectRepositoryService} from "../services/project-repository.service";
import {NavigationService} from "../routing-module/navigation.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

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
                ProjectRepositoryService,
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
});
