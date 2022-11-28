import { testWidgetData } from "../widgets/test-widget/test-widget.component"
export class Page {
    header: Header;
    body: Body;
    footer: Footer;
    constructor(header: Header, body: Body, footer: Footer) {
        this.header = header;
        this.body = body;
        this.footer = footer;
    }
}
export class PagePart {
    widgets: WidgetData[];
    constructor(widgets: WidgetData[]) {
        this.widgets = widgets;
    }
}

export class Header extends PagePart {
    constructor(widgets: WidgetData[]) {
        super(widgets);
    }
}

export class Footer extends PagePart {
    constructor(widgets: WidgetData[]) {
        super(widgets);
    }
}
export class Body extends PagePart {
    gridDimensions: gridCoordinates;
    constructor(widgets: WidgetData[], gridDimensions: gridCoordinates) {
        super(widgets);
        this.gridDimensions = gridDimensions;
    }
}
/**
 * TODO: Check for integers, might be hard in typescript
 */
export class WidgetData {
    id: number;
    coordinates: gridCoordinates; // TODO: Check that y must be 1 for header & footer
    width: number;
    height: number; // TODO: Check that height must be 1 for header & footer
    constructor(id: number, coordinates: gridCoordinates, width: number, height: number) {
        this.id = id;
        this.coordinates = coordinates;
        this.width = width;
        this.height = height;
    }
}
export interface gridCoordinates {
    x: number,
    y: number
}
export interface PageDataStructure {
}
