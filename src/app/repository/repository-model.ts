import {
  Coordinates,
  iCpeListResource,
  iImageWidget,
  iPage,
  iPagePart,
  iProject,
  iTextWidget,
  iWidget
} from "./cpe-api.service";

/**
 * The base class for all resources. Used by inheritance as well as for lists.
 */
export class CpeResource {
  readonly _id: string = '';
  protected _label: string = '';
  protected _description: string = '';

  constructor(resource: iCpeListResource) {
    this._id = resource.id;
    this._label = resource.label;
    this._description = resource.description;
  }

  get id() { return this._id; }

  get label() { return this._label; }

  set label(label: string) { this._label = label; }

  get description() { return this._description; }

  set description(description) { this._description = description; }
}

/**
 * The Project class
 */
export class Project extends CpeResource{
  private _pages: string[] = [];

  constructor(project: iProject) {
    super(project);
    this._pages = project.pages;
  }

  get pages() { return this._pages; }

  set pages(pages) { this._pages = pages; }

  /**
   * return the first page of the project if there is a page. Return an empty string if there is
   * no page at all for this project.
   */
  firstPage(): string {
    return this._pages.length? this._pages[0] : '';
  }

  /**
   * return true if a project contains a page with the given id.
   * @param pageId: the page which is checked
   */
  hasPage(pageId: string): boolean {
    return this._pages.indexOf(pageId) > -1;
  }
}

/**
 * The Page class
 */
export class Page extends CpeResource {
  private _header: string;
  private _body: string;
  private _footer: string;
  private _girdDimensions: Coordinates;

  constructor(page: iPage) {
    super(page);
    this._header = page.header;
    this._body = page.body;
    this._footer = page.footer;
    this._girdDimensions = page.grid_dimensions;
  }

  get header() { return this._header; }

  get body() { return this._body; }

  get footer() { return this._footer; }

  get gridDimensions() { return this._girdDimensions; }
}

export class PagePart extends CpeResource{
  protected _page_id: string;
  protected _widgets: any[]; // todo: type it
  constructor(pagePart: iPagePart) {
    super(pagePart);
    this._page_id = pagePart.page_id;
    this._widgets = pagePart.widgets;
  }

  get pageId() { return this. _page_id; }

  get widgets() { return this._widgets; }
}

export class Header extends PagePart {
  constructor(pagePart: iPagePart) {
    super(pagePart);
  }
}

export class Body extends PagePart {
  constructor(pagePart: iPagePart) {
    super(pagePart);
  }
}

export class Footer extends PagePart {
  constructor(pagePart: iPagePart) {
    super(pagePart);
  }
}

export class NullPagePart extends PagePart {
  constructor(pagePart: iPagePart) {
    super(pagePart);
  }
}

export class PagePartFactory {
  static build(pagePart: iPagePart): PagePart {
    switch (pagePart.pp_type) {
      case 'header':
        return new Header(pagePart);
      case 'body':
        return new Body(pagePart);
      case 'footer':
        return new Footer(pagePart);
      default:
        return new NullPagePart(pagePart);
    }
  }
}

export class Widget extends CpeResource{
  constructor(widget: iWidget) {
    super(widget);
  }
}

export class ImageWidget extends Widget{
  private text: string;
  private image: string;
  private alt: string;

  constructor(widget: iImageWidget) {
    super(widget);
    this.text = widget.text;
    this.image = widget.image;
    this.alt = widget.alt;
  }
}

export class TextWidget extends Widget{
  private text: string;

  constructor(widget: iTextWidget) {
    super(widget);
    this.text = widget.text;
  }
}

export class NullWidget extends Widget{
  constructor(widget: iTextWidget) {
    super(widget);
  }
}

export class WidgetFactory {
  static build(widget: iImageWidget): Widget {
    switch (widget.widget_type) {
      case 'text':
        return new TextWidget(widget);
      case 'image':
        return new ImageWidget(widget);
      default:
        return new NullWidget(widget);
    }
  }
}
