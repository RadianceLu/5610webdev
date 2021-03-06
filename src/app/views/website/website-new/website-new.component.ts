import {Component, OnInit, ViewChild} from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service';


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
  user: User;

  website: Website;

  constructor(private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) { }

  createWebsite() {
    this.name = this.websiteForm.value.name;
    this.description = this.websiteForm.value.description;

    this.website = new Website(undefined, this.name, this.userId, this.description);
    this.websiteService.createWebsite(this.userId, this.website).subscribe(
      (data: any) => {
        this.website = data;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      });
  }

    ngOnInit() {
      this.user = this.sharedService.user;
      this.userId = this.user._id;

      this.websiteService.findWebsiteByUser(this.userId).subscribe(
        (websites: Website[]) => {
          this.websites = websites;
        });
  }

}
