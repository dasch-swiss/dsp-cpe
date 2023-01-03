import { Injectable } from '@angular/core';

interface iCpeApiService {
  getProject(id: string): Promise<any>;
}

@Injectable({
  providedIn: 'root',
})
export class CpeApiService implements iCpeApiService {
  constructor() { }

  /**
   * gets a list of projects from the api route
   */
  async getProjects() {
    return fetch('http://localhost:3000/projects');
  }

  /**
   * gets a projects data via the api route
   */
  async getProject(id: string) {
    return fetch(`http://localhost:3000/projects/get/${id}`);
  }

  /**
   * gets a pages data via the api route
   */
  async getPage(id: string) {
    return fetch(`http://localhost:3000/pages/get/${id}`);
  }
}

