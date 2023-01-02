export class Page {
  private _header: Header;
  private _body: Body;
  private _footer: Footer;
  get header(): Header {
    return this._header;
  }

  set header(header: Header) {
    this._header = header;
  }

  get body(): Body {
    return this._body;
  }

  set body(body: Body) {
    this._body = body;
  }

  get footer(): Footer {
    return this._footer;
  }

  set footer(footer: Footer) {
    this._footer = footer;
  }

  get gridDimensions(): gridCoordinates {
    return this._gridDimensions;
  }

  constructor(private _gridDimensions: gridCoordinates) {}
}
export class PagePart {
  get widgets(): WidgetData[] {
    return this._widgets;
  }
  constructor(private _widgets: WidgetData[]) {}
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
  constructor(widgets: WidgetData[]) {
    super(widgets);
  }
}
/**
 * TODO: Check for integers, might be hard in typescript
 */
export class WidgetData {
  // TODO: Check that cordinates's y must be 1 for header & footer
  // TODO: Check that height must be 1 for header & footer
  get id() {
    return this._id;
  }

  get coordinates() {
    return this._coordinates;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }
  constructor(private readonly _id: number, private _coordinates: gridCoordinates, private _width: number, private _height: number) {}
}
export class gridCoordinates {
  constructor(public x: number, public y: number) {
  }
}
export class PageStructure {
  constructor(public page: Page) {}
}
