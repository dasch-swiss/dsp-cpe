import { Component } from '@angular/core';
import {PageStructureValidatorService} from "./cpe/blue-boxes/validator/page-structure-validator.service";
import {PageStructureService} from "./cpe/blue-boxes/services/page-structure.service";
import {PageStructure} from "./cpe/blue-boxes/model/page-data-structure";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: PageStructure;
  constructor(private pageStructure: PageStructureService, private validatorService: PageStructureValidatorService) {
    const mls_ps = this.pageStructure.getMLS();
    const beol_ps = this.pageStructure.getBeol();
    const ww_ps = this.pageStructure.getWordWeb();

    if (validatorService.validate(mls_ps)) {
      this.data = mls_ps;
    }
  }
}
