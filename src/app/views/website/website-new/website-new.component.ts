import {Component, OnInit, ViewChild} from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') websiteForm: NgForm;
  name: String;
  description: String;
  userId: String;
  websites: Website[] = [];

  constructor(private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute) { }

  createWebsite() {
    this.name = this.websiteForm.value.name;
    this.description = this.websiteForm.value.description;

    const website: Website = new Website(new Date().getTime() + '', this.name, this.userId, this.description);
    this.websiteService.createWebsite(this.userId, website);
  }

    ngOnInit() {
      this.activatedRoute.params.subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );

      this.websites = this.websiteService.findWebsiteByUser2(this.userId);
  }

}
