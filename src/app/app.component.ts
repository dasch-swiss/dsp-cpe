import { Component } from '@angular/core';
import { PageStructureValidatorService } from './cpe/blue-boxes/validator/page-structure-validator.service';
import { PageStructureService } from './cpe/blue-boxes/services/page-structure.service';
import { PageStructure } from './cpe/blue-boxes/model/page-data-structure';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: PageStructure;
  constructor(private pageStructureService: PageStructureService, private validatorService: PageStructureValidatorService) {
    const projectPageStructure = this.pageStructureService.getMLS();

    if (validatorService.validate(projectPageStructure)) {
      this.data = projectPageStructure;
    }
  }
}
