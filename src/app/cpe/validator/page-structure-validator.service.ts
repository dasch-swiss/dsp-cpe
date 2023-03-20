import {Injectable} from "@angular/core";
import {Dimension, Project} from "../model/page-data-structure";

@Injectable({
    providedIn: "root"
})
export class PageStructureValidatorService {
    private readonly MIN_GRID_DIMENSION: Dimension = { width: 6, height: 6 }
    private readonly MAX_GRID_DIMENSION: Dimension = { width: 12, height: 12 }
    private readonly MIN_WIDGET_DIMENSION: Dimension = { width: 1, height: 1 }
    constructor() {
    }

    validate(projectStructure: Project) {

        // Example rule 1: Grid dimensions are positive numbers
        if (projectStructure.gridDimensions.width <= 0 || projectStructure.gridDimensions.height <= 0) {
            throw Error("Grid dimension values of page are invalid");
        }

        // Example rule 2: Grid dimensions have the right size
        if (projectStructure.gridDimensions.width < this.MIN_GRID_DIMENSION.width
            || projectStructure.gridDimensions.width > this.MAX_GRID_DIMENSION.width
            || projectStructure.gridDimensions.height < this.MIN_GRID_DIMENSION.height
            || projectStructure.gridDimensions.height > this.MAX_GRID_DIMENSION.height) {
            throw Error("Size of page have wrong dimensions");
        }

        // Example rule 3: It should have at least one page
        if (projectStructure.body.length === 0) {
            throw Error("It should have at least a page in the body");
        }

        // Example rule 4 ...
        for (let page of projectStructure.body) {
            for (let widget of page.widgets) {
                // ...grid dimensions of widgets are positive numbers
                if (widget.dimension.width <= 0 || widget.dimension.height <= 0) {
                    throw Error("Grid dimension values of widget are invalid");
                }
                // ...grid dimensions of widget have the right size
                if (widget.dimension.width < this.MIN_WIDGET_DIMENSION.width
                    || widget.dimension.height < this.MIN_WIDGET_DIMENSION.height) {
                    throw Error("Size of widget have wrong dimensions");
                }
                // ...coordinates of widgets are valid
                if (widget.coordinates.x < 0
                    || widget.coordinates.y < 0) {
                    throw Error("Coordinates of the widget are invalid");
                }
                // ...widgets are placed within bounds
                if (widget.coordinates.x + widget.dimension.width > projectStructure.gridDimensions.width
                    || widget.coordinates.y + widget.dimension.height > projectStructure.gridDimensions.height) {
                    throw Error("Size of the widget are out of bounds");
                }
            }
        }
    }
}
