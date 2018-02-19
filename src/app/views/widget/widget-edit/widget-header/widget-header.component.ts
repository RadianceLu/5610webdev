import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  widget: Widget;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute) { }

  updateWidget(widget) {
    console.log(widget);
    this.widgetService.updateWidget(widget);
  }

  deleteWidget(widgetId) {
    this.widgetService.deleteWidget(widgetId);
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.widget = this.widgetService.findWidgetById(params['wgid']);
      // this.widget = Object.assign({}, preWidget);
    });
  }
}
