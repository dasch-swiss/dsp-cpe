import {Component, OnInit, OnDestroy} from "@angular/core";
import {NavigationService} from "../../routing-module/navigation.service";
import {PageStructureValidatorService} from "../validator/page-structure-validator.service";
import {ProjectRepositoryService} from "../../services/project-repository.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "app-project",
    templateUrl: "./project.component.html"
})
export class ProjectComponent implements OnInit, OnDestroy {

    project: any | undefined = undefined;

    page_id: string

    private projectRouteSubscription: Subscription;

    constructor(private _projectService: ProjectRepositoryService,
                private _validatorService: PageStructureValidatorService,
                private _route: ActivatedRoute,
                private _naviService: NavigationService) {
        this.projectRouteSubscription = new Subscription();
    }

    ngOnInit(): void {
        this.projectRouteSubscription = this._route.params.subscribe(parameter => {
            if (parameter["id"] && parameter["id"] !== this.project?.id) {
                this.loadProject(parameter["id"]);
            }

            if (parameter["pageId"]) {
                this.page_id = parameter["pageId"];
            }
        });
    }

    /**
     * Load the project's data. Navigate to the projects component if there is no data for the given project id.
     * @param projectId: The project to which is navigated.
     */
    loadProject(projectId: string) {
        this._projectService.getProjectByIdFull(projectId)
                        .subscribe({
                            next: (projectPageStructure) => {
                                try {
                                    this._validatorService.validate(projectPageStructure);
                                    this.project = projectPageStructure;
                                }
                                catch(error){
                                    // TODO Case: Invalid page structure
                                    console.error(error);
                                }
                            },
                            error: (error) => {
                                console.error(error);
                            }
                        })
    }

    /**
     * navigate to a specific page of this project
     * @param pageId: The page to which is navigated.
     */
    goToPage(pageId: string) {
        this._naviService.navigateToPage(this.project.id, pageId);
    }

    /**
     * navigate to the projects component..
     */
    goToProjectsOverview() {
        this._naviService.navigateToProjectsPage();
    }

    ngOnDestroy() {
        this.projectRouteSubscription.unsubscribe();
    }
}
