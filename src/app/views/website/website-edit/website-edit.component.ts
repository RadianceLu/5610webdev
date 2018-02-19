import { Component, OnInit } from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';

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

  updateWebsite(website) {
    console.log(website);
    this.websiteService.updateWebsite(website);
  }

  deleteWebsite(websiteId) {
    this.websiteService.deleteWebsite(websiteId);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      const preWebsite = this.websiteService.findWebsiteById(params['wid']);
      this.website = Object.assign({}, preWebsite);
      this.websites = this.websiteService.findWebsiteByUser2(this.userId);
    });
  }

}
