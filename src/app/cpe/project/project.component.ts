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

  private _project: Project | undefined = undefined;

  private projectRouteSubscription: Subscription;

  constructor( private projectService: ProjectRepositoryService,
               private route: ActivatedRoute,
               private naviService: NavigationService ) {
    this.projectRouteSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.projectRouteSubscription = this.route.params.subscribe(parameter => {
      if (parameter['id'] && parameter['id'] !== this.project?.id) {
        this.loadProject(parameter['id']);
      }
    });
  }

  get project() {
    return this._project;
  }

  /**
   * Load the project's data. Navigate to the projects component if there is no data for the given project id.
   * @param projectId: The project to which is navigated.
   */
  loadProject(projectId: string) {
    this.projectService.getProjectById(projectId).then(p => {
        this._project = p;
    }).catch(err => this.goToProjectsOverview());
  }

  /**
   * navigate to a specific page of this project
   * @param pageId: The page to which is navigated.
   */
  goToPage(pageId: string){
    const projectId = this.project? this.project.id : '';
    this.naviService.navigateToPage(projectId, pageId);
  }

  /**
   * navigate to the projects component..
   */
  goToProjectsOverview(){
    this.naviService.navigateToProjectsPages();
  }

  ngOnDestroy() {
    this.projectRouteSubscription.unsubscribe();
  }
}
