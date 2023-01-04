import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectRepositoryService} from "../repository/project-repository.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectRepositoryService) {

  }

  /**
   * navigates to a specific project
   * @param projectId: The project to which is navigated.
   */
  public navigateToProjectsPage() {
    this.router.navigate(['projects'])
  }

  /**
   * navigates to a specific project
   * @param projectId: The project to which is navigated.
   */
  public navigateToProject(projectId: string) {
    return this.projectService.isProjectExisting(projectId).then( exists => {
      if (exists) {
        return this.router.navigate(["project/" + projectId]);
      } else {
        console.warn(`Project not found. There is no project with id ${projectId}.`)
        return;
      }
    });
  }

  /**
   * navigates to a specific page of a specific project.
   * @param projectId: The id of the project.
   * @param pageId: The id of the page to which is navigated.
   */
  public navigateToPage(projectId: string, pageId: string) {
    return this.projectService.getProjectByID(projectId).then( p => {
      if (p && p.hasPage(pageId)) {
        return this.router.navigate(
          ['project/' + projectId + '/' + pageId],
          {
            relativeTo: this.route,
            queryParamsHandling: 'merge'
          });
      } else {
        console.warn(`Page not found. The project ${projectId} does not have a page with id ${pageId}`);
        return;
      }
    });
  }
}
