import { Injectable } from '@angular/core';
import {PageStructure} from '../model/page-data-structure';

@Injectable({
  providedIn: 'root'
})
export class PageStructureValidatorService {
  constructor() { }

  validate(pageStructure: PageStructure) {
    // Example rule 1: It should have at least a header, a body or a footer
    if (pageStructure.page.header == undefined && pageStructure.page.footer == undefined && pageStructure.page.body == undefined) {
      throw new Error('It should have at least a header, a body or a footer');
    }

    // Example rule 2: If there is a header, it should contain at least one widget and not more than 3 widget
    if (pageStructure.page.header) {
      const amountWidget = pageStructure.page.header.widgets.length;
      if (amountWidget < 1 || amountWidget > 3) {
        throw new Error('1 to 3 widgets are expected in the header.');
      }
    }

    // Example rule 3: If there is a footer, it should contain at least one widget and not more than 3 widget
    if (pageStructure.page.footer) {
      const amountWidget = pageStructure.page.footer.widgets.length;
      if (amountWidget < 1 || amountWidget > 3) {
        throw new Error('1 to 3 widgets are expected in the footer.');
      }
    }

    // Example rule 4: If there is a body, it should contain at least one widget
    if (pageStructure.page.body) {
      if (pageStructure.page.body.widgets.length == 0) {
        throw new Error('At least 1 widget expected in body.');
      }
    }
    return true;
  }
}
