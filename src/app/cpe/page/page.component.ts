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
        this.loadPage(this.pageId);
      }
    });
    if (!this.pageId) { // in case it is routed to the page component without a page id
      this.navigateToDefaultPage();
    }
  }

  /**
   * loads the page passed. Navigates to the default page, if no page data can be retrieved from the api.
   * @param pageId: The id of the page to be loaded.
   */
  loadPage(pageId: string) {
    this.pageService.getPageById(pageId).then(p => {
        this.page = p;
    }).catch(err => this.navigateToDefaultPage() );
  }

  /**
   * loads the default page, i.e. the very first page in the projects pages list.
   */
  navigateToDefaultPage() {
    if (!this.project || !this.project.firstPage()) { // guard
      console.warn(`no pages available for project with id ${this.project?.id}`);
      return;
    }
    console.warn('navigate to default page')
    this.navigationService.navigateToPage(this.project?.id, this.project.firstPage());
  }

  ngOnDestroy() {
    this.pageRouteSubscription.unsubscribe();
  }
}
