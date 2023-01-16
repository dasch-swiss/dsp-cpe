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

  constructor(private _repo: ProjectRepositoryService, private _naviService: NavigationService) { }

  ngOnInit(): void {
    this._repo.getProjectsList().then( projects => {
      this.projects = projects;
    });
  }

  goToProject(projectId: string) {
    this._naviService.navigateToProject(projectId);
  }

}
