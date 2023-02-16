import {Component, OnInit} from "@angular/core";
import {Project} from "./model/page-data-structure";
import {ProjectRepositoryService} from "../services/project-repository.service";
import {NavigationService} from "../routing-module/navigation.service";

@Component({
    selector: "app-cpe",
    templateUrl: "./cpe.component.html",
    styleUrls: ["./cpe.component.scss"]
})
export class CpeComponent implements OnInit {
    projects: Project[] = [];

    constructor(private _repo: ProjectRepositoryService, private _naviService: NavigationService) {
    }

    ngOnInit() {
        this._repo.getProjects().subscribe((projects: Project[]) => {
            this.projects = projects;
        })
    }

    goToProject(projectId: string) {
        this._naviService.navigateToProject(projectId);
    }
}
