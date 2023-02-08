import {Injectable} from '@angular/core';
import {CpeApiService} from "./cpe-api.service";
import {Project, CpeResource} from "./repository-model";
import {map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProjectRepositoryService {

  constructor(private _apiService: CpeApiService) {
  }

  /**
   * get the array of CpeResource instances via the api service. Return it as a Promise.
   */
  getProjectsList(): Observable<CpeResource[]> {
    return this._apiService.getList('projects')
        .pipe(
            map(resources => resources.map(resource => new CpeResource(resource)))
        );
  }

  /**
   * get a project via the api service. Return a Project as Promise.
   */
  getProjectById(id: string): Observable<Project> {
    return this._apiService.getProject(id)
        .pipe(
            map(project => new Project(project))
        );
  }
}
