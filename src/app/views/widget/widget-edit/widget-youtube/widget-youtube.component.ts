import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  widget: Widget;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute) { }

  updateWidget(widget) {
    console.log(widget);
    this.widgetService.updateWidget( widget);
  }

  deleteWidget(widgetId) {
    this.widgetService.deleteWidget(widgetId);
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const preWidget = this.widgetService.findWidgetById(params['wgid']);
      this.widget = Object.assign({}, preWidget);
    });
  }

}
