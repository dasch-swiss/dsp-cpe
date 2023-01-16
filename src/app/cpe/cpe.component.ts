import { Component } from '@angular/core';
import {PageStructure} from "./blue-boxes/model/page-data-structure";
import {PageStructureService} from "./blue-boxes/services/page-structure.service";
import {PageStructureValidatorService} from "./blue-boxes/validator/page-structure-validator.service";

@Component({
  selector: 'app-cpe',
  templateUrl: './cpe.component.html',
  styleUrls: ['./cpe.component.scss']
})
export class CpeComponent {
  data: PageStructure;
  constructor(private _pageStructureService: PageStructureService, private _validatorService: PageStructureValidatorService) {
    const projectPageStructure = this._pageStructureService.getMLS();

    if (this._validatorService.validate(projectPageStructure)) {
      this.data = projectPageStructure;
    }
  }
}
