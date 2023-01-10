import {iCpeListResource, iPage, iProject} from "./cpe-api.service";

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
  private _widgets: string[] = [];

  constructor(page: iPage) {
    super(page);
    this._widgets = page.widgets;
  }

  get widgets() { return this._widgets; }

  set widgets(widgets) { this._widgets = widgets; }

  /**
   * return true if a page contains a widget with a given id.
   * @param widgetId: the widget which is checked
   */
  hasWidget(widgetId: string): boolean {
    return this._widgets.indexOf(widgetId) > -1;
  }
}
