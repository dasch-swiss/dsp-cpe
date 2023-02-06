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

  project: Project | undefined = undefined;

  private projectRouteSubscription: Subscription;

  constructor( private _projectService: ProjectRepositoryService,
               private _route: ActivatedRoute,
               private _naviService: NavigationService ) {
    this.projectRouteSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.projectRouteSubscription = this._route.params.subscribe(parameter => {
      if (parameter['id'] && parameter['id'] !== this.project?.id) {
        this.loadProject(parameter['id']);
      }
    });
  }

  /**
   * Load the project's data. Navigate to the projects component if there is no data for the given project id.
   * @param projectId: The project to which is navigated.
   */
  loadProject(projectId: string) {
    this._projectService.getProjectById(projectId).subscribe({
        next: (project) => {
            this.project = project;
        },
        error: (error) => {
            console.error(error);
        }
    })
  }

  /**
   * navigate to a specific page of this project
   * @param pageId: The page to which is navigated.
   */
  goToPage(pageId: string){
    const projectId = this.project? this.project.id : '';
    this._naviService.navigateToPage(projectId, pageId);
  }

  /**
   * navigate to the projects component..
   */
  goToProjectsOverview(){
    this._naviService.navigateToProjectsPage();
  }

  ngOnDestroy() {
    this.projectRouteSubscription.unsubscribe();
  }
}
