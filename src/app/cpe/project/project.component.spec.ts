import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ProjectComponent } from './project.component';
import { CpeApiService } from 'src/app/services/cpe-api.service';
import { Project } from '../model/page-data-structure';
import { Component, Input } from '@angular/core';
import { PageStructureValidatorService } from '../validator/page-structure-validator.service';
/**
 * Mock executor component
 */
@Component({
    selector: 'app-executor'
})
class MockExecutorComponent {
    @Input() pageStructure: Project;
    @Input() pageID: string;
}
describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let mockActivatedRoute: any;
  let mockApiService: jasmine.SpyObj<CpeApiService>;
  let mockValidatorService: jasmine.SpyObj<PageStructureValidatorService>
  beforeEach(async () => {
    mockActivatedRoute = {
      params: new BehaviorSubject({ id: 'testID', pageID: 'testPageID' }),
    };
    mockApiService = jasmine.createSpyObj(['getProject']);
    mockValidatorService = jasmine.createSpyObj('PageStructureValidatorService', ['validate']);
    mockApiService.getProject.and.returnValue(
      of(
        new Project(
          'p-001',
          'label 1',
          'description',
          'image 1',
          'page-001',
          { height: 6, width: 6 }
        )
      )
    );

    await TestBed.configureTestingModule({
      declarations: [ProjectComponent, MockExecutorComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: CpeApiService,
          useValue: mockApiService,
        },
        { provide: PageStructureValidatorService, useValue: mockValidatorService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load project when id parameter changes', () => {
    spyOn(component, 'loadProject');
    mockActivatedRoute.params.next({ id: 'testID2', pageID: 'testPageID' });
    fixture.detectChanges();

    expect(component.loadProject).toHaveBeenCalledWith('testID2');
  });

  it('should set pageID when pageID parameter is present', () => {
    mockActivatedRoute.params.next({ id: 'testID', pageID: 'testPageID2' });
    fixture.detectChanges();

    expect(component.pageID).toEqual('testPageID2');
  });

  it('should display error when invalid pageStructure is returned', fakeAsync(() => {
    mockValidatorService.validate.and.throwError('test Error');
    component.loadProject("testID");
    flush();
    tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML.indexOf("Either the project structure or the page id is invalid!")).not.toEqual(-1);
  }));

  it('should display executor when a valid pageStructure is returned', fakeAsync(() => {
    mockValidatorService.validate.and.stub();
    component.loadProject("testID");
    flush();
    tick();
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('app-executor');
    expect(elem).toBeTruthy();
  }));

  it('loadProject() should throw an error when the api returns an error', fakeAsync(() => {
    mockApiService.getProject.and.throwError("Test error");
    try {
        component.loadProject("testID");
        flush();
        tick();
        fail("Expected error to be thrown");
    } catch(error) {
        expect(error).toEqual(new Error("Test error"));
    }
  }));

});