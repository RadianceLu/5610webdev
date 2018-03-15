module.exports = function(app) {
  var WEBSITES = [
    {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    {"_id": "234", "name": "Twitter", "developerId": "456", "description": "Lorem"},
    {"_id": "456", "name": "Gizmdo", "developerId": "456", "description": "Lorem"},
    {"_id": "890", "name": "Go", "developerId": "456", "description": "Lorem"},
    {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"},
  ];

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;

    var newWebsite = {
      _id: (new Date()).getTime() + "",
      name: website.name,
      description: website.description,
      developerId: website.developerId
    };
    WEBSITES.push(newWebsite);
    var websites = getWebsitesForUserId(userId);
    res.json(websites);
  }

  function getWebsitesForUserId(userId) {
    var websites=[];

    for(var i = 0; i < WEBSITES.length; i++) {
      if (WEBSITES[i].developerId === userId) {
        websites.push(WEBSITES[i]);
      }
    }
    return websites;
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    var websites = getWebsitesForUserId(userId);
    res.json(websites);
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    res.json(getWebsiteById(websiteId));
  }

  function getWebsiteById(websiteId) {
    for (var i = 0; i < WEBSITES.length; i++) {
      if (WEBSITES[i]._id === websiteId) {
        return WEBSITES[i];
      }
    }
  }

  function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var newWebSite = req.body;
    for(var i = 0; i < WEBSITES.length; i++) {
      if (WEBSITES[i]._id === websiteId) {
        WEBSITES[i] = newWebSite;
        res.status(200).send(newWebSite);
        return;
      }
    }
    res.status(404).send("not found!");
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    for (var i = 0; i < WEBSITES.length; i++) {
      if (WEBSITES[i]._id === websiteId) {
        var j = +i;
        WEBSITES.splice(j, 1);
        res.json(WEBSITES);
        return;
      }
    }
  }
};
