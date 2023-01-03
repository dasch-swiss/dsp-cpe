import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PageRepositoryService} from "../../repository/page-repository.service";
import {Page, Project} from "../../repository/repository-model";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {NavigationService} from "../../routing-module/navigation.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit, OnDestroy {

  @Input() project?: Project;

  pageId: string = '';

  page: Page | undefined;

  pageRouteSubscription: Subscription;

  constructor(private pageService: PageRepositoryService,
              private route: ActivatedRoute,
              private navigationService: NavigationService) {
    this.pageRouteSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.pageRouteSubscription = this.route.params.subscribe(parameter => {
      if (parameter['pageId'] && parameter['pageId'] !== this.pageId) {
        this.pageId = parameter['pageId'];
        this.initPage(this.pageId);
      }
    });
    if (!this.pageId) { // in case it is routed to the page component without a page id
      this.navigateToDefaultPage();
    }
  }

  /**
   * initialized the page passed. Navigates to the default page, if no page id is passed at all or if the current project
   * does not have a passed page.
   * @param pageId: The id of the page to be loaded.
   */
  initPage(pageId: string | null) {
    if ( pageId && this.project?.hasPage(pageId)) {
      this.loadPage(pageId);
    } else { // if there does not exist that page id for the project, we load the projects first page
      console.warn(`No page with id ${pageId} found. Navigating to default/first page of project`)
      this.navigateToDefaultPage();
    }
  }

  /**
   * loads the page passed. Navigates to the default page, if no page data can be retrieved from the api.
   * @param pageId: The id of the page to be loaded.
   */
  loadPage(pageId: string) {
    this.pageService.getPageByID(pageId).then(p => {
      if (p) {
        this.page = p;
      } else { // if no such page existing
        console.warn(`no page with id ${pageId} found. Routing to default page.`)
        this.navigateToDefaultPage();
      }
    });
  }

  /**
   * loads the default page, i.e. the very first page in the projects pages list.
   */
  navigateToDefaultPage() {
    if (!this.project || !this.project.firstPage()) { // guard
      console.warn(`no pages available for project with id ${this.project?.id}`);
      return;
    }
    this.navigationService.navigateToPage(this.project?.id, this.project.firstPage());
  }

  ngOnDestroy() {
    this.pageRouteSubscription.unsubscribe();
  }
}
