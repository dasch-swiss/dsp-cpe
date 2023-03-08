export class Project {
    private _header: Header;
    private _body: Page[] = [];
    private _footer: Footer;

    get header(): Header {
        return this._header;
    }
    set header(header: Header) {
        this._header = header;
    }
    get body(): Page[] {
        return this._body;
    }
    set body(body: Page[]) {
        this._body = body;
    }
    get footer(): Footer {
        return this._footer;
    }
    set footer(footer: Footer) {
        this._footer = footer;
    }
    hasPage(pageID: string): boolean {
        return this._body.some((page:Page) => page.hasPageID(pageID));
    }

    constructor(public readonly id: string,
                public label: string,
                public description: string,
                public image: string,
                public mainPageID: string,
                public gridDimensions: Dimension
    ) {
    }
}

export class Header {
    private _pages: string[] = [];
    get pages(): string[] {
        return this._pages;
    }
    set pages(body: string[]) {
        this._pages = body;
    }
    constructor(private readonly _id: string, public title: string, public logo: string, public login: boolean) {
    }
}

export class Footer {
    constructor(private readonly _id: string, public data: string) {
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
