import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../cpe/model/page-data-structure";
import {CpeApiService} from "../services/cpe-api.service";

@Injectable({
    providedIn: "root"
})
export class NavigationService {

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _apiService: CpeApiService) {

    }

    /**
     * navigates to a specific project
     */
    public navigateToProjectsPage() {
        this._router.navigate(["projects"], { skipLocationChange: true })
    }

    /**
     * navigates to a specific project
     * @param projectID: The project to which is navigated.
     */
    public navigateToProject(projectID: string) {
        this._router.navigate(["projects/" + projectID], { skipLocationChange: true });
    }

    /**
     * navigates to a specific page of a specific project.
     * @param projectID: The id of the project.
     * @param pageID: The id of the page to which is navigated.
     */
    public navigateToPage(projectID: string, pageID: string) {
        this._apiService.getProject(projectID).subscribe({
            next: (project: Project) => {
                if (project.hasPage(pageID)) {
                    this._router.navigate(
                        ["projects/" + projectID + "/" + pageID],
                        {
                            relativeTo: this._route,
                            queryParamsHandling: "merge"
                        }
                    );
                } else {
                    throw Error("No page on this project with that ID was found");
                }
            },
            error: (error) => {
                console.error(error);
            }
        })
    }
}
