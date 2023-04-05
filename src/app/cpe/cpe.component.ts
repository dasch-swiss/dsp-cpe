import {Component, OnInit} from "@angular/core";
import {Project} from "./model/page-data-structure";
import {NavigationService} from "../routing-module/navigation.service";
import {CpeApiService} from "../services/cpe-api.service";

@Component({
    selector: "app-cpe",
    templateUrl: "./cpe.component.html"
})
export class CpeComponent implements OnInit {
    projects: Project[] = [];

    constructor(private _apiService: CpeApiService, private _naviService: NavigationService) {
    }

    ngOnInit() {
        this._apiService.getProjects().subscribe((projects: Project[]) => {
            this.projects = projects;
        })
    }

    goToProject(projectId: string) {
        this._naviService.navigateToProject(projectId);
    }
}
