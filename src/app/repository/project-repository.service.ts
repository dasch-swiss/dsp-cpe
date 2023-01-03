import { Injectable } from '@angular/core';
import {CpeApiService} from "./cpe-api.service";
import {Project, RepositoryObject} from "./repository-model";


interface iProjectRepo {
  getProjectByID(id: string): any;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectRepositoryService implements iProjectRepo{

  constructor(private apiService: CpeApiService) {
  }

  /**
   * gets the list of projects via the api service. Returns it as a RepositoryObject array.
   */
  async getProjectsList():Promise<RepositoryObject[]> {
    const pList: RepositoryObject[] = [];
    const rJson: any[] = await this.apiService.getProjects().then(response => {
      return response.json();
    });
    if(!Object.keys(rJson).length) { return []; } // if no projects exists
    for (let i=0; i < rJson.length; i++){
      const repObject = new RepositoryObject(rJson[i]['iri']);
      repObject.label = rJson[i]['label'];
      repObject.description = rJson[i]['description'];
      pList.push(repObject);
    }
    return pList;
  }

  async isProjectExisting(projectId: string): Promise<boolean> {
    return !!await this.getProjectByID(projectId)
  }

  /**
   * gets a projects data via the api service. Returns a Project object.
   */
  async getProjectByID(id: string): Promise<Project | undefined> {
    const rJson = await this.apiService.getProject(id).then(response => {
      return response.json()
    });
    if(!Object.keys(rJson).length) { return undefined; } // if no such project exists
    const p = new Project(rJson['id']);
    p.label = rJson['label'];
    p.description = rJson['description'];
    p.pages = rJson['pages'];
    return p;
  }
}
