module.exports = function (app) {
  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname+'/../../src/assets/uploads' });

  var WIDGETS = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": "2", "text": "GIZMODO", "width": "10%", "url": "url"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum", "width": "100%", "url": "url"},
    {"_id": "345", "widgetType": "IMAGE", "pageId": "321", "size": "1", "text": "text", "width": "100%", "url": "http://lorempixel.com/400/200/"},
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "size": "1", "text": "HTML Lorem ipsum", "width": "100%", "url": "url"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum", "width": "100%", "url": "url"},
    {"_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "size": "1", "text": "text", "width": "100%", "url": "https://www.youtube.com/embed/AM2Ivdi9c4E"},
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "size": "1", "text": "Lorem ipsum", "width": "100%", "url": "url"}
  ];

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.put("/api/page/:pageId/widget", reorderWidgets);
  app.post("/api/upload", upload.single('myFile'), uploadImage);


  function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    var newWidget = {
      _id: (new Date()).getTime() + "",
      name: widget.name,
      widgetType: widget.widgetType,
      pageId: pageId,
      size: widget.size,
      text: widget.text,
      width: widget.width,
      url: widget.url
    };

    WIDGETS.push(newWidget);
    if (newWidget) {
      res.status(200).json(newWidget);
    } else {
      res.sendStatus(500);
    }
  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    var widgets = getWidgetsForPageId(pageId);
    res.json(widgets);
  }

  function getWidgetsForPageId(pageId) {
    var widgets=[];

    for(var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i].pageId === pageId) {
        widgets.push(WIDGETS[i]);
      }
    }
    return widgets;
  }

  function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    res.json(getWidgetById(widgetId));
  }

  function getWidgetById(widgetId) {
    for (var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i]._id === widgetId) {
        return WIDGETS[i];
      }
    }
  }

  function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var newWidget = req.body;
    for(var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i]._id === widgetId) {
        WIDGETS[i] = newWidget;
        res.status(200).send(newWidget);
        return;
      }
    }
    res.status(404).send("not found!");
  }

  function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    for (var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i]._id === widgetId) {
        var j = +i;
        WIDGETS.splice(j, 1);
        res.json(WIDGETS);
        return;
      }
    }
  }

  function reorderWidgets(req, res) {
    var pageId = req.params['pageId'];
    var index1 = req.query["start"];
    var index2 = req.query["end"];

    var widgetForPage = WIDGETS.filter(function (w) {
      return parseInt(w.pageId) == parseInt(pageId);
    });

    WIDGETS = WIDGETS.filter(function (w) {
      return parseInt(w.pageId) != parseInt(pageId);
    });

    console.log(index1, index2);
    var temp = widgetForPage[index1];
    widgetForPage.splice(index1, 1);
    widgetForPage.splice(index2, 0, temp);
    WIDGETS.push.apply(WIDGETS, widgetForPage);

    res.send(WIDGETS);
    return WIDGETS;
  }

  function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    if (myFile == null) {
      // return "http://localhost:4200/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
      return "https://jielu-webdev.herokuapp.com/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
    }

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;
    var widget = getWidgetById(widgetId);

    function getWidgetById(widgetId) {
      if (widgetId === undefined || widgetId === null || widgetId === '') {
        var newWidget = {
          _id: new Date().getTime() + '',
          widgetType: 'IMAGE',
          pageId: pageId,
          size: '1',
          text: 'text',
          width: width
        };

        WIDGETS.push(newWidget);
        return newWidget;
      }
      for (w in WIDGETS) {
        if (parseInt(WIDGETS[w]._id) === parseInt(widgetId)) {
          return WIDGETS[w];
        }
      }
    }

    widget.url = '/uploads/' + filename;

    console.log(filename);

    // var callbackUrl = "http://localhost:4200/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
    var callbackUrl = "https://jielu-webdev.herokuapp.com/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
    res.redirect(callbackUrl);
  }

};
