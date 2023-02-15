import {Injectable} from "@angular/core";
import {Project} from "../model/page-data-structure";

@Injectable({
    providedIn: "root"
})
export class PageStructureValidatorService {
    constructor() {
    }

    validate(projectStructure: Project) {
        // Example rule 1: It should have at least a page
        if (projectStructure.body.length === 0) {
            throw Error("It should have at least a page in the body");
        }

        // Example rule 2: All pages should ...
        // ... contain at least a widget in the header and in the footer
        if (projectStructure.header.length == 0 || projectStructure.footer.length == 0) {
            throw Error("It should have a header and a footer");
        }

        // Example rule 3: Header widgets should be placed above footer widgets
        if (projectStructure.header.length > 0 && projectStructure.footer.length > 0) {
            let found = false;
            for (let w_h of projectStructure.header) {
                for (let w_f of projectStructure.footer) {
                    if (w_h.coordinates.y >= w_f.coordinates.y) {
                        found = true
                    }
                }
            }

            if (found) {
                throw Error("Header widgets not placed above footer widgets");
            }
        }

    }
}
