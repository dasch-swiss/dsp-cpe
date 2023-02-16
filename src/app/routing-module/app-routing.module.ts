import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProjectComponent} from "../cpe/project/project.component";
import {CpeComponent} from "../cpe/cpe.component";
import {HttpClientModule} from "@angular/common/http";

const ROUTES: Routes = [
    {
        path: "projects",
        component: CpeComponent
    },
    {
        path: "projects/:id",
        component: ProjectComponent,
    },
    {
        path: "projects/:id/:pageId",
        component: ProjectComponent,
    },
    {
        path: "**",
        pathMatch: "full",
        redirectTo: "/projects"
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, {onSameUrlNavigation: "reload"}),
        HttpClientModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
