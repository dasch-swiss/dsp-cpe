import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectComponent} from "../cpe/project/project.component";
import {CpeComponent} from "../cpe/cpe.component";
import {ProjectsComponent} from "../cpe/projects/projects.component";
import {HttpClientModule} from "@angular/common/http";

const ROUTES: Routes = [
  {
    path: "home",
    component: CpeComponent
  },
  {
    path: "projects",
    component: ProjectsComponent,
  },
  {
    path: "project/:id",
    component: ProjectComponent,
  },
  {
    path: "project/:id/:pageId",
    component: ProjectComponent,
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "/home"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, { onSameUrlNavigation: 'reload' }),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
