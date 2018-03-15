import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../environments/environment';

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

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute) { }

  updateWidget(widget) {
    this.widgetService.updateWidget(widget).subscribe();
  }

  deleteWidget(widgetId) {
    this.widgetService.deleteWidget(widgetId).subscribe();
  }
  ngOnInit() {
    this.baseUrl = environment.baseUrl;

    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
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
