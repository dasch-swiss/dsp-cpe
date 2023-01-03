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
  constructor(private pageStructureService: PageStructureService, private validatorService: PageStructureValidatorService) {
    const projectPageStructure = this.pageStructureService.getMLS();

    if (validatorService.validate(projectPageStructure)) {
      this.data = projectPageStructure;
    }
  }
}
