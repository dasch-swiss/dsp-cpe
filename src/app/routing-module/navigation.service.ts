import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectRepositoryService} from "../repository/project-repository.service";
import {Project} from "../repository/repository-model";

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
  public navigateToProjectsPages() {
    this.router.navigate(['projects'])
  }

  /**
   * navigates to a specific project
   * @param projectId: The project to which is navigated.
   */
  public navigateToProject(projectId: string) {
    this.projectService.exists(projectId).then(exists => {
      if (exists) {
        return this.router.navigate(["project/" + projectId]);
      } else {
        this.navigateToProjectsPages();
        return ;
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
      if (!p) { // navigate to projects overview
        this.navigateToProjectsPages();
        return;
      } else { // navigate
        if (p.hasPage(pageId)) {
          return this.router.navigate(
            ['project/' + projectId + '/' + pageId],
            {
              relativeTo: this.route,
              queryParamsHandling: 'merge'
            });
        } else { // do not navigate, but stay on projects page
          return;
        }
      }
    });
  }
}
