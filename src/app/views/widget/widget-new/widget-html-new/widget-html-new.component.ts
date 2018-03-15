import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-html-new',
  templateUrl: './widget-html-new.component.html',
  styleUrls: ['./widget-html-new.component.css']
})
export class WidgetHtmlNewComponent implements OnInit {

  @ViewChild('f') widgetForm: NgForm;
  pageId: String;
  widget: Widget;

  name: String;
  text: String;
  size: String;
  width: String;
  url: String;
  rows: String;
  placeHolder: String;
  formatted: String;
  middle: String;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute) { }

  createWidget() {
    this.name = this.widgetForm.value.name;
    this.text = this.widgetForm.value.text;

    this.size = '1';
    this.width = '100%';
    this.url = 'url';
    this.rows = 'rows';
    this.placeHolder = 'placeHolder';
    this.formatted = 'formatted';

    this.widget = new Widget(new Date().getTime() + '', 'HTML', this.pageId, this.size.toString(),
this.text.toString(), this.width.toString(), this.url.toString(), this.name.toString(),
this.rows.toString(), this.placeHolder.toString(), this.formatted.toString());
    this.widgetService.createWidget(this.pageId, this.widget).subscribe();
    this.middle = this.text;
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.pageId = params['pid'];
    });
  }
}
