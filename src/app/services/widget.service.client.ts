import {Injectable} from '@angular/core';
import {Widget} from '../models/widget.model.client';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
// import {environment} from '../../environments/environment';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class WidgetService {

  constructor(private http: Http) {}

  baseUrl = environment.baseUrl;

  createWidget(pageId: String, widget: Widget) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this.http.post(url, widget).map((response: Response) => {
      return response.json();
    });
  }

  findWidgetByPageId(pageId: String) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  findWidgetById(widgetId: String) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  updateWidget(widget) {
    // for (let i = 0; i < this.widgets.length; i++) {
    //   if (this.widgets[i]._id === widget._id) {
    //     switch (widget.widgetType) {
    //       case 'HEADER':
    //         this.widgets[i].text = widget.text;
    //         this.widgets[i].size = widget.size;
    //         return this.widgets[i];
    //
    //       case 'IMAGE':
    //         this.widgets[i].text = widget.text;
    //         this.widgets[i].url = widget.url;
    //         this.widgets[i].width = widget.width;
    //         return this.widgets[i];
    //
    //       case 'YOUTUBE':
    //         this.widgets[i].text = widget.text;
    //         this.widgets[i].url = widget.url;
    //         this.widgets[i].width = widget.width;
    //         return this.widgets[i];
    //     }
    //   }
    // }
    const url = this.baseUrl + '/api/widget/' + widget._id;
    return this.http.put(url, widget).map((response: Response) => {
      return response.json();
    });
  }

  deleteWidget(widgetId: String) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }

  reorderWidgets(startIndex, endIndex, pageId) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget?start=' + startIndex + '&end=' + endIndex;
    return this.http.put(url, '').map((response: Response) => {
      return response.json();
    });
  }
}
