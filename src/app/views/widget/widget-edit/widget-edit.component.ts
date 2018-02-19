import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
  widget: Widget;
  userId: String;

  constructor(private widgetService: WidgetService,
              private route: ActivatedRoute) { }

  updateWidget(widget) {
    console.log(widget);
    this.widget = this.widgetService.updateWidget(widget);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const preWidget = this.widgetService.findWidgetById(params['wgid']);
      this.widget = Object.assign({}, preWidget);
      this.userId = params['uid'];
    });
  }

}
