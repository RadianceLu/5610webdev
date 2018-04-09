import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  websiteId: String;
  pages: Page[] = [];
  userId: String;
  user: User;

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user._id;
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
      }
    );
    this.pageService.findPageByWebsiteId(this.websiteId).subscribe(
      (pages: Page[]) => {
        this.pages = pages;
      }
    );
  }

}
