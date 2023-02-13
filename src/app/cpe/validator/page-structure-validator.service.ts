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
        if (projectStructure.pages.length === 0) {
            throw Error("It should have at least a page in the project");
        }

        // Example rule 2: All pages should ...
        // ... contain at least a header or a body or a footer
        for (let page of projectStructure.pages) {
            if (page.header.length === 0 && page.body.length === 0 || page.footer.length === 0) {
                throw Error("It should have a header, body or a footer");
            }

            // Example rule 2a: If there is a header, it should ...
            // ... contain not more than 3 widgets
            if (page.header.length > 3) {
                throw Error("Not more than 3 widgets in the header");
            }

            // Example rule 2b: If there is a footer, it should ...
            // ... contain not more than 3 widgets
            if (page.footer.length > 3) {
                throw Error("Not more than 3 widgets in the footer");
            }
        }


        // Example rule 3: Header widgets should be placed above footer widgets
        for (let page of projectStructure.pages) {
            if (page.header.length > 0 && page.footer.length > 0) {

                let found = false;
                for (let w_h of page.header) {
                    for (let w_f of page.footer) {
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
}
