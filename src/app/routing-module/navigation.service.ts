import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectRepositoryService} from "../services/project-repository.service";
import {Project} from "../cpe/model/page-data-structure";

@Injectable({
    providedIn: "root"
})
export class NavigationService {

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _projectService: ProjectRepositoryService) {

    }

    /**
     * navigates to a specific project
     */
    public navigateToProjectsPage() {
        this._router.navigate(["projects"], { skipLocationChange: true })
    }

    /**
     * navigates to a specific project
     * @param projectId: The project to which is navigated.
     */
    public navigateToProject(projectId: string) {
        this._router.navigate(["projects/" + projectId], { skipLocationChange: true });
    }

    /**
     * navigates to a specific page of a specific project.
     * @param projectId: The id of the project.
     * @param pageId: The id of the page to which is navigated.
     */
    public navigateToPage(projectId: string, pageId: string) {
        this._projectService.getProjectByIdFull(projectId).subscribe({
            next: (project: Project) => {
                if (project.hasPage(pageId)) {
                    this._router.navigate(
                        ["projects/" + projectId + "/" + pageId],
                        {
                            relativeTo: this._route,
                            skipLocationChange: true,
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
