import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  page: Page;
  userId: String;

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  updatePage(changed_page) {
    this.pageService.updatePage(changed_page).subscribe(
      (data: any) => {
        this.page = data;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  deletePage(pageId) {
    this.pageService.deletePage(pageId).subscribe(
      (data: any) => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // const prePage = this.pageService.findPageById(params['pid']);
      // this.page = Object.assign({}, prePage);
      this.pageService.findPageById(params['pid']).subscribe(
        (page: Page) => {
          this.page = page;
        }
      );
      this.userId = params['uid'];
    });
  }

}
