
/**
 * The base class for all resources. Used by inheritance as well as for lists.
 */
export class RepositoryObject {
  readonly _id: string = '';
  protected _label: string = '';
  protected _description: string = '';

  constructor(id: string) {
    this._id = id;
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
export class Project extends RepositoryObject{
  private _pages: string[] = [];

  constructor(id: string) {
    super(id);
  }

  get pages() { return this._pages; }

  set pages(pages) { this._pages = pages; }

  /**
   * returns the first page of the project if there is a page. Returns an empty string if there is
   * no page at all for this project.
   */
  firstPage(): string {
    return this._pages.length? this._pages[0] : '';
  }

  /**
   * returns true if a project contains a page with the given id.
   * @param pageId: the page which is checked
   */
  hasPage(pageId: string): boolean {
    return this._pages.indexOf(pageId) > -1;
  }

}

/**
 * The Page class
 */
export class Page extends RepositoryObject {
  private _widgets: string[] = [];

  constructor(id: string) {
    super(id);
  }

  get widgets() { return this._widgets; }

  set widgets(widgets) { this._widgets = widgets; }

  /**
   * returns true if a page contains a widget with a given id.
   * @param widgetId: the widget which is checked
   */
  hasWidget(widgetId: string): boolean {
    return this._widgets.indexOf(widgetId) > -1;
  }
}
