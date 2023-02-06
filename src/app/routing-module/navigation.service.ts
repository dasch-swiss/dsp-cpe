import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectRepositoryService} from "../repository/project-repository.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _projectService: ProjectRepositoryService) {

  }

  /**
   * navigates to a specific project
   */
  public navigateToProjectsPage() {
    this._router.navigate(['projects'], { replaceUrl: false })
  }

  /**
   * navigates to a specific project
   * @param projectId: The project to which is navigated.
   */
  public navigateToProject(projectId: string) {
    this._projectService.isProjectExisting(projectId).then( exists => {
      if (exists) {
        this._router.navigate(["project/" + projectId], { replaceUrl: false });
      }
    });
  }

  /**
   * navigates to a specific page of a specific project.
   * @param projectId: The id of the project.
   * @param pageId: The id of the page to which is navigated.
   */
  public navigateToPage(projectId: string, pageId: string) {
    this._projectService.getProjectById(projectId).then( p => {
      if (p && p.hasPage(pageId)) {
        this._router.navigate(
          ['project/' + projectId + '/' + pageId],
          {
            relativeTo: this._route,
            replaceUrl: false,
            queryParamsHandling: 'merge'
            }
          );
      }
    });
  }
}
