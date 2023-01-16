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
    this.router.navigate(['projects'], { replaceUrl: false })
  }

  /**
   * navigates to a specific project
   * @param projectId: The project to which is navigated.
   */
  public navigateToProject(projectId: string) {
    this.projectService.isProjectExisting(projectId).then( exists => {
      if (exists) {
        this.router.navigate(["project/" + projectId], { replaceUrl: false });
      }
    });
  }

  /**
   * navigates to a specific page of a specific project.
   * @param projectId: The id of the project.
   * @param pageId: The id of the page to which is navigated.
   */
  public navigateToPage(projectId: string, pageId: string) {
    this.projectService.getProjectById(projectId).then( p => {
      if (p && p.hasPage(pageId)) {
        this.router.navigate(
          ['project/' + projectId + '/' + pageId],
          {
            relativeTo: this.route,
            replaceUrl: false,
            queryParamsHandling: 'merge'
            }
          );
      }
    });
  }
}
