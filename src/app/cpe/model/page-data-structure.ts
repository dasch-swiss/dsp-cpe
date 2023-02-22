export class Project {
    private _header: Widget[] = [];
    private _body: Page[] = [];
    private _footer: Widget[] = [];

    get header(): Widget[] {
        return this._header;
    }
    set header(header: Widget[]) {
        this._header = header;
    }
    get body(): Page[] {
        return this._body;
    }
    set body(body: Page[]) {
        this._body = body;
    }
    get footer(): Widget[] {
        return this._footer;
    }
    set footer(footer: Widget[]) {
        this._footer = footer;
    }
    hasPage(pageID: string): boolean {
        return this._body.some((page:Page) => page.hasPageID(pageID));
    }

    constructor(public readonly id: string,
                public label: string,
                public description: string,
                public mainPageID: string,
                public gridDimensions: Dimension
    ) {
    }
}

export class Page {
    private _widgets: Widget[] = [];

    get widgets(): Widget[] {
        return this._widgets;
    }
    set widgets(widgets: Widget[]) {
        this._widgets = widgets;
    }
    hasPageID(pageID: string): boolean {
        return this.id === pageID;
    }

    constructor(public readonly id: string, public label: string) {
    }
}

/**
 *
 */
export class Widget {
    get dimension() {
        return this._dimension;
    }
    get coordinates() {
        return this._coordinates;
    }

    constructor(
        private readonly _id: string,
        public widgetType: string,
        private _coordinates: Coordinate,
        private _dimension: Dimension,
        public data: Object,
    ) {
    }
}

export type Coordinate = {
    x: number,
    y: number
}

export type Dimension = {
    height: number,
    width: number
}
