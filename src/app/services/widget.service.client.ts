import {Injectable} from '@angular/core';
import {Widget} from '../models/widget.model.client';

@Injectable()
export class WidgetService {
  widgets: Widget[] = [
    new Widget('123', 'HEADING', '321', '2', 'GIZMODO'),
    new Widget('234', 'HEADING', '321', '4', 'Lorem ipsum'),
    new Widget('345', 'IMAGE', '321', '1', 'text', '100%', 'http://lorempixel.com/400/200/'),
    new Widget('456', 'HTML', '321', '1', '<p>Lorem ipsum</p>'),
    new Widget('567', 'HEADING', '321', '4', 'Lorem ipsum'),
    new Widget('678', 'YOUTUBE', '321', '1', 'text', '100%', 'https://youtu.be/AM2Ivdi9c4E'),
    new Widget('789', 'HTML', '321', '1', '<p>Lorem ipsum</p>')
  ];

  createWidge(pageId: String, widget: Widget) {
    widget.pageId = pageId;
    this.widgets.push(widget);
  }

  findWidgetByPageId(pageId: String) {
    const resultSet = [];
    for ( const i in this.widgets) {
      if (this.widgets[i].pageId === pageId) {
        resultSet.push(this.widgets[i]);
      }
    }
    return resultSet;
  }

  findWidgetById(widgetId: String) {
    return this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });
  }

  updateWidget(widgetId: String, widget) {
    for (let i = 0; i < this.widgets.length; i++) {
      if (this.widgets[i]._id === widgetId) {
        switch (widget.widgetType) {
          case 'HEADER':
            this.widgets[i].text = widget.text;
            this.widgets[i].size = widget.size;
            return true;

          case 'IMAGE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return true;

          case 'YOUTUBE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return true;
        }
      }
    }
    return false;
  }

  deleteWidget(widgetId: String) {
    for (const i in this.widgets) {
      if (this.widgets[i]._id === widgetId) {
        const j = +i;
        this.widgets.splice(j, 1);
      }
    }
  }
}
