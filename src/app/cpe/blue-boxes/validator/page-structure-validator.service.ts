import { Injectable } from '@angular/core';
import {PageStructure} from "../model/page-data-structure";

@Injectable({
  providedIn: 'root'
})
export class PageStructureValidatorService {
  constructor() { }

  validate(pageStructure: PageStructure) {
    // Example rule 1: It should have at least a header, a body or a footer

    // Example rule 2: If there is a header, it should contain at least one widget or not more than 3 widget

    // Example rule 3: If there is a footer, it should contain at least one widget or not more than 3 widget

    // Example rule 4: If there is a body, it should contain at least one widget
    return true;
  }
}
