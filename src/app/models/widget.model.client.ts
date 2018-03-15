export class Widget {
  _id: String;
  widgetType: String;
  pageId: String;
  size: String;
  text: String;
  url: String;
  width: String;
  name: String;
  rows: String;
  placeHolder: String;
  formatted: String;

  constructor(_id, widgetType, pageId, size = '1', text = 'text', width = '100%', url = 'url', name = 'name', rows = '1',
placeHolder = 'placeHolder', formatted = 'formatted') {
    this._id = _id;
    this.name = name;
    this.widgetType = widgetType;
    this.pageId = pageId;
    this.size = size;
    this.text = text;
    this.url = url;
    this.width = width;
    this.rows = rows;
    this.placeHolder = placeHolder;
    this.formatted = formatted;
  }
}
