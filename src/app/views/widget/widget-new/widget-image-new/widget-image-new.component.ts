import {Component, OnInit, ViewChild} from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-widget-image-new',
  templateUrl: './widget-image-new.component.html',
  styleUrls: ['./widget-image-new.component.css']
})
export class WidgetImageNewComponent implements OnInit {
  @ViewChild('f') widgetForm: NgForm;
  pageId: String;

  text: string;
  size: string;
  url: string;
  width: string;

  baseUrl: String;
  websiteId: String;
  widgetId: String;
  userId: String;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute) { }

  createWidget() {
    this.text = this.widgetForm.value.text;
    this.size = this.widgetForm.value.size;
    this.url = this.widgetForm.value.url;
    this.width = this.widgetForm.value.width;

    const widget: Widget = new Widget(new Date().getTime() + '', 'IMAGE', this.pageId, this.size, this.text, this.width, this.url);
    this.widgetService.createWidget(this.pageId, widget).subscribe();
  }
  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
    });
  }

}
