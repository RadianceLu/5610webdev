module.exports = function (app) {
  var PAGES = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
  ];


  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var page = req.body;

    var newPage = {
      _id: (new Date()).getTime() + "",
      name: page.name,
      websiteId: websiteId,
      description: page.description
    };

    PAGES.push(newPage);
    if (newPage) {
      res.status(200).json(newPage);
    } else {
      res.sendStatus(500);
    }
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var pages = getPagesForWebsiteId(websiteId);
    res.json(pages);
  }

  function getPagesForWebsiteId(websiteId) {
    var pages=[];

    for(var i = 0; i < PAGES.length; i++) {
      if (PAGES[i].websiteId === websiteId) {
        pages.push(PAGES[i]);
      }
    }
    return pages;
  }

  function findPageById(req, res) {
    var pageId = req.params['pageId'];
    res.json(getPageById(pageId));
  }

  function getPageById(pageId) {
    for (var i = 0; i < PAGES.length; i++) {
      if (PAGES[i]._id === pageId) {
        return PAGES[i];
      }
    }
  }

  function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var newPage = req.body;
    for(var i = 0; i < PAGES.length; i++) {
      if (PAGES[i]._id === pageId) {
        PAGES[i] = newPage;
        res.status(200).send(newPage);
        return;
      }
    }
    res.status(404).send("not found!");
  }

  function deletePage(req, res) {
    var pageId = req.params['pageId'];
    for (var i = 0; i < PAGES.length; i++) {
      if (PAGES[i]._id === pageId) {
        var j = +i;
        PAGES.splice(j, 1);
        res.json(PAGES);
        return;
      }
    }
  }
}
