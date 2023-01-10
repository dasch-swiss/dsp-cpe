import {Component, OnInit} from '@angular/core';
import {CpeResource} from "../../repository/repository-model";
import {ProjectRepositoryService} from "../../repository/project-repository.service";
import {NavigationService} from "../../routing-module/navigation.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  projects: CpeResource[] = [];

  constructor(private repo: ProjectRepositoryService, private naviService: NavigationService) { }

  ngOnInit(): void {
    this.repo.getProjectsList().then( projects => {
      this.projects = projects;
    });
  }

  goToProject(projectId: string) {
    this.naviService.navigateToProject(projectId);
  }

}
