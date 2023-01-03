import { Component, OnInit } from '@angular/core';
import { RepositoryObject} from "../../repository/repository-model";
import {ProjectRepositoryService} from "../../repository/project-repository.service";
import {NavigationService} from "../../routing-module/navigation.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  projects: RepositoryObject[] = [];

  constructor(private repo: ProjectRepositoryService, private naviService: NavigationService) { }

  ngOnInit(): void {
    this.repo.getProjectsList().then( pList => this.projects = pList);
  }

  goToProject(projectId: string) {
    this.naviService.navigateToProject(projectId);
  }

}
