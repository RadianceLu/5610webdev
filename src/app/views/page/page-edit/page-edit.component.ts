import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  page: Page;
  userId: String;

  constructor(private pageService: PageService,
              private route: ActivatedRoute) { }

  updatePage(page) {
    console.log(page);
    this.pageService.updatePage(page);
  }

  deletePage(pageId) {
    this.pageService.deletePage(pageId);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const prePage = this.pageService.findPageById(params['pid']);
      this.page = Object.assign({}, prePage);
      this.userId = params['uid'];
    });
  }

}
