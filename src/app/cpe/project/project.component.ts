import {Component, OnInit, OnDestroy} from "@angular/core";
import {NavigationService} from "../../routing-module/navigation.service";
import {PageStructureValidatorService} from "../validator/page-structure-validator.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../model/page-data-structure";
import {CpeApiService} from "../../services/cpe-api.service";

@Component({
    selector: "app-project",
    templateUrl: "./project.component.html"
})
export class ProjectComponent implements OnInit, OnDestroy {

    project: Project;

    pageID: string
    error: boolean = false;

    private projectRouteSubscription: Subscription;

    constructor(private _apiService: CpeApiService,
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

            if (parameter["pageID"]) {
                this.pageID = parameter["pageID"];
            }
        });
    }

    /**
     * Load the project's data. Navigate to the projects component if there is no data for the given project id.
     * @param projectID: The project to which is navigated.
     */
    loadProject(projectID: string) {
        this._apiService.getProject(projectID)
            .subscribe({
                next: (projectPageStructure) => {
                    try {
                        this._validatorService.validate(projectPageStructure);
                        this.project = projectPageStructure;
                    }
                    catch(error){
                        this.error = true;
                        console.error(error);
                    }
                },
                error: (error) => {
                    this.error = true;
                    throw Error(error);
                }
            })
    }

    ngOnDestroy() {
        this.projectRouteSubscription.unsubscribe();
    }
}
