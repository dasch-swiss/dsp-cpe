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

    // Example rule 2: If there is a header, it should ...
    // ... contain at least one widget and not more than 3 widgets
    // ... have widgets with height 1
    if (pageStructure.page.header) {
      const amountWidget = pageStructure.page.header.widgets.length;
      if (amountWidget < 1 || amountWidget > 3) {
        throw new Error('1 to 3 widgets are expected in the header');
      }

      if (pageStructure.page.header.widgets.find(w => w.height <= 0 || w.height > 1)) {
        throw new Error('header widgets are only allowed to have height of 1');
      }
    }

    // Example rule 3: If there is a footer, it should ...
    // ... contain at least one widget and not more than 3 widgets
    // ... have widgets with height 1
    if (pageStructure.page.footer) {
      const amountWidget = pageStructure.page.footer.widgets.length;
      if (amountWidget < 1 || amountWidget > 3) {
        throw new Error('1 to 3 widgets are expected in the footer');
      }

      if (pageStructure.page.footer.widgets.find(w => w.height <= 0 || w.height > 1)) {
        throw new Error('footer widgets are only allowed to have height of 1');
      }
    }

    // Example rule 4: Header widgets should be placed above footer widgets
    if (pageStructure.page.header && pageStructure.page.footer) {
      let found = false;
      for (let w_h of pageStructure.page.header.widgets) {
        for (let w_f of pageStructure.page.footer.widgets) {
          if (w_h.coordinates.y >= w_f.coordinates.y) {
            found = true
          }
        }
      }

      if (found) {
        throw new Error('Header widgets not placed above footer widgets');
      }
    }

    // Example rule 5: If there is a body, it should contain at least one widget
    if (pageStructure.page.body) {
      if (pageStructure.page.body.widgets.length == 0) {
        throw new Error('At least 1 widget expected in body');
      }
    }
    return true;
  }
}
