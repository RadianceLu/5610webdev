import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {User} from '../../../../models/user.model.client';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  widget: Widget;
  baseUrl: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  userId: String;
  user: User;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) { }

  updateWidget(widget) {
    this.widgetService.updateWidget(widget).subscribe(
      () => {
        // this.widget = data;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  deleteWidget(widgetId) {
    this.widgetService.deleteWidget(widgetId).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }
  ngOnInit() {
    this.baseUrl = environment.baseUrl;

    this.user = this.sharedService.user;
    this.activatedRoute.params.subscribe(params => {
      this.userId = this.user._id;
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
      this.widgetService.findWidgetById(params['wgid']).subscribe(
        (widget: Widget) => {
          this.widget = widget;
        }
      );
    });
  }

}
