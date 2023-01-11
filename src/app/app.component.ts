import { Component, Inject } from '@angular/core';
import { PageStructureValidatorService } from './cpe/blue-boxes/validator/page-structure-validator.service';
import { PageStructureService } from './cpe/blue-boxes/services/page-structure.service';
import { PageStructure } from './cpe/blue-boxes/model/page-data-structure';
import { RollbarService } from './rollbar';

import * as Rollbar from 'rollbar'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    data: PageStructure;

    constructor(@Inject(RollbarService) private rollbar: Rollbar,
                private pageStructureService: PageStructureService,
                private validatorService: PageStructureValidatorService
    ) {
        const projectPageStructure = this.pageStructureService.getMLS();

        if (validatorService.validate(projectPageStructure)) {
            this.data = projectPageStructure;
        }
    }

     // Example log event using the rollbar object.
  rollbarInfo() {
    this.rollbar.info('angular test log');
  }

  // Example error, which will be reported to rollbar.
  throwError() {
    throw new Error('angular test error');
  }
}
