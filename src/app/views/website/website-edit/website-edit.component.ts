import { Component, OnInit } from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  website: Website;
  userId: String;
  websites: Website[] = [];

  constructor(private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute) { }

  updateWebsite(changed_website) {
    this.websiteService.updateWebsite(changed_website).subscribe();
  }

  deleteWebsite(websiteId) {
    this.websiteService.deleteWebsite(websiteId).subscribe(
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      // const preWebsite = this.websiteService.findWebsiteById(params['wid']);
      // this.website = Object.assign({}, preWebsite);
      this.websiteService.findWebsiteById(params['wid']).subscribe(
        (website: Website) => {
          this.website = website;
        }
      );
      // this.websites = this.websiteService.findWebsiteByUser(this.userId);
      this.websiteService.findWebsiteByUser(this.userId).subscribe(
        (websites: Website[]) => {
          this.websites = websites;
        }
      );
    });
  }

}
