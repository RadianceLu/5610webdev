import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-text-new',
  templateUrl: './widget-text-new.component.html',
  styleUrls: ['./widget-text-new.component.css']
})
export class WidgetTextNewComponent implements OnInit {

  @ViewChild('f') widgetForm: NgForm;
  pageId: String;
  widget: Widget;

  name: String;
  text: String;
  size: number;
  width: String;
  url: String;
  rows: number;
  placeHolder: String;
  formatted: boolean;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  createWidget() {
    this.name = this.widgetForm.value.text;
    this.text = this.widgetForm.value.text;
    this.rows = this.widgetForm.value.text;
    this.placeHolder = this.widgetForm.value.placeHolder;
    this.size = 1;
    this.width = '100%';
    this.url = 'url';
    this.formatted = true;

    this.widget = new Widget(undefined, 'TEXT', this.pageId, this.size,
      this.text.toString(), this.width.toString(), this.url.toString(), this.name.toString(), this.rows,
      this.placeHolder.toString(), this.formatted);
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(
      () => {
        // this.widget = data;
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
      }
    );
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.pageId = params['pid'];
    });
  }
}
