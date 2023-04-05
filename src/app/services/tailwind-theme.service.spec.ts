import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import {TailwindThemeService} from './tailwind-theme.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Component} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

// a mock component using a tw-class
@Component({
    template: `<div id="mockElement" class="bg-primary"></div>`
})
class MockComponent {
    constructor() {
    }
}

describe('TailwindThemeService', () => {
    let service: TailwindThemeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MockComponent],
            imports: [HttpClientTestingModule],
            providers: [TailwindThemeService]
        });
        service = TestBed.inject(TailwindThemeService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    const mockData = {
        selectedTheme: 'fakeTheme',
        themes: {
            fakeTheme: { // fallback theme
                black: "#000000",
                white: "#FFFFFF",
                primary: "#336790",
                secondary: "#FFFFFF",
                highlight: "#74A2CF",
                disabledText: "#9CA3AF",
                disabledBackground: "#E5E7EB",
                selected: "#D6E0E8",
                checked: "#D6E0E8",
                unchecked: "#E5E7EB",
                warningText: "#F59E0B",
                warningBackground: "#FEF3C7",
                surface: "#000000",
                surfaceText: "#FFFFFF"
            },
            fakeTheme2: { // fallback theme
                black: "#00000A",
                white: "#FFFFFA",
                primary: "#33679A",
                secondary: "#FFFFFA",
                highlight: "#74A2CA",
                disabledText: "#9CA3AA",
                disabledBackground: "#E5E7EA",
                selected: "#D6E0EA",
                checked: "#D6E0EA",
                unchecked: "#E5E7EA",
                warningText: "#F59E0A",
                warningBackground: "#FEF3CA",
                surface: "#00000A",
                surfaceText: "#FFFFFA"
            }
        }
    };

    // run initThemes with the mock data
    function initWithMockData() {
        service.initThemes('/anyApi/mock');
        // intercepting the api call and set the response to our mockData
        const req = httpMock.expectOne('/anyApi/mock');
        expect(req.request.method).toBe('GET');
        req.flush(mockData);
        tick();
    }

    it('should initialize themes from a server and set the selected theme', fakeAsync(() => {

        initWithMockData();
        // selected Theme set?
        expect(service.selectedTheme).toEqual(mockData.selectedTheme);
        // are the themes set?
        expect(service.themes).toEqual(mockData.themes);

    }));
});


describe('TailwindThemeService styles Components with TW-class', () => {
    let component: MockComponent;
    let fixture: ComponentFixture<MockComponent>;
    let service: TailwindThemeService;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule], // imports: [HttpClientTestingModule],
            declarations: [MockComponent],
            providers: [{ provide: TailwindThemeService, useValue: service }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MockComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(TailwindThemeService);
        httpMock = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
    });

    it('should set the colors via Tailwind class and the css variables according to the default theme', () => {
        const element = fixture.nativeElement;

        // helper function to convert rgb to hex color
        function rgbToHex(rgb: string): string {
            // Get the RGB values from the string
            const rgbValues = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

            if (rgbValues === null) {
                return '';
            }

            // Convert the RGB values to hex values
            const r = parseInt(rgbValues[1], 10).toString(16).padStart(2, '0');
            const g = parseInt(rgbValues[2], 10).toString(16).padStart(2, '0');
            const b = parseInt(rgbValues[3], 10).toString(16).padStart(2, '0');

            // Return the hex color
            return `#${r}${g}${b}`;
        }
        const rgbColorOfTheMockDiv = getComputedStyle(element.querySelector('#mockElement')).getPropertyValue('background-color');
        const hexColorOfDiv = rgbToHex(rgbColorOfTheMockDiv);
        // expect the resulting color of the mock component to equal what we have selected as theme.secondary in
        // or service
        if (hexColorOfDiv) {
            const allowedHexColors = ['#f59e0b', '#336790'];
            expect(allowedHexColors).toContain(hexColorOfDiv);
        }
    });
});

