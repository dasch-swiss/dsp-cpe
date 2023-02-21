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
        this._router.navigate(["projects"], {replaceUrl: false})
    }

    /**
     * navigates to a specific project
     * @param projectId: The project to which is navigated.
     */
    public navigateToProject(projectId: string) {
        this._router.navigate(["projects/" + projectId], {replaceUrl: false});
    }

    /**
     * navigates to a specific page of a specific project.
     * @param projectId: The id of the project.
     * @param pageId: The id of the page to which is navigated.
     */
    public navigateToPage(projectId: string, pageId: string) {
        this._apiService.getProject(projectId).subscribe({
            next: (project: Project) => {
                if (project.hasPage(pageId)) {
                    this._router.navigate(
                        ["projects/" + projectId + "/" + pageId],
                        {
                            relativeTo: this._route,
                            replaceUrl: false,
                            queryParamsHandling: "merge"
                        }
                    );
                }
            },
            error: (error) => {
                console.error(error);
            }
        })
    }
}
