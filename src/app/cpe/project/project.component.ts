import { Component, OnInit, OnDestroy } from '@angular/core';
import {NavigationService} from "../../routing-module/navigation.service";
import {Project} from "../../repository/repository-model";
import {ProjectRepositoryService} from "../../repository/project-repository.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit, OnDestroy {

  private _projectId = '';
  private _project: Project | undefined = undefined;

  private projectRouteSubscription: Subscription;

  constructor( private projectService: ProjectRepositoryService,
               private route: ActivatedRoute,
               private naviService: NavigationService ) {
    this.projectRouteSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.projectRouteSubscription = this.route.params.subscribe(parameter => {
      if (parameter['id'] && parameter['id'] !== this._projectId) {
        this.initProject(parameter['id']);
      }
    });
  }

  get project() {
    return this._project;
  }

  /**
   * inits a specific project id passed. If there is no project with that id, the app navigates
   * to the projects component
   * @param projectId: The project which is loaded.
   */
  initProject(projectId: string | null) {
    if ( projectId ) {
      this.loadProject(projectId);
    } else { // if no project id given, route to default project page
      console.warn(`No project id passed - navigating to projects overview.`)
      this.goToProjectsOverview();
    }
  }

  /**
   * Loads the project's data. If there is no data for the given project id, it navigates to the projects component.
   * @param projectId: The project to which is navigated.
   */
  loadProject(projectId: string) {
    this._projectId = projectId;
    this.projectService.getProjectByID(this._projectId).then(p => {
      if (p) {
        this._project = p;
      } else {
        console.warn(`Project with id ${projectId} not found - navigating to projects overview.`);
        this.goToProjectsOverview();
      }
    });
  }

  /**
   * navigates to a specific page of this project
   * @param pageId: The page to which is navigated.
   */
  goToPage(pageId: string){
    if (!pageId) { return; }
    this.naviService.navigateToPage(this._projectId, pageId);
  }

  /**
   * navigates to the projects component..
   */
  goToProjectsOverview(){
    this.naviService.navigateToProjectsPage();
  }


  ngOnDestroy() {
    this.projectRouteSubscription.unsubscribe();
  }
}
