import { Injectable } from '@angular/core';
import {CpeApiService} from "./cpe-api.service";
import {Project, CpeResource, iCpeListResource } from "./repository-model";
import {firstValueFrom, lastValueFrom } from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ProjectRepositoryService {

  constructor(private apiService: CpeApiService, private http: HttpClient) {
  }

  /**
   * gets the array of CpeResource instances via the api service. Returns it as a Promise.
   */
  async getProjectsList(): Promise<CpeResource[]> {
    const resources$ = this.apiService.getList('projects');
    const resources: iCpeListResource[] = await lastValueFrom(resources$);
    return resources.map(r => new CpeResource(r))
  }

  /**
   * gets a projects data via the api service. Returns an instanced Project as Promise.
   */
  async getProjectById(id: string): Promise<Project> {
    const resource$ =  this.apiService.getProject(id);
    const project = await firstValueFrom(resource$)
    return new Project(project);
  }

  /**
   * checks if a project is existing ior not. Returns a bool as promise.
   */
  async isProjectExisting(projectId: string): Promise<boolean> {
    return !!await this.getProjectById(projectId)
  }
}
