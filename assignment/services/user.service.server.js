module.exports = function (app) {

  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.get("/api/user/hello", helloUser);

  var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonderland"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];

  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  function findAllUsers(req, res){
    res.json(users);
  }

  function createUser(req, res){
    var user = req.body;
    // var newUser = {
    //   _id: (new Date()).getTime() + "",
    //   username: user.username,
    //   password: user.password,
    //   firstName: user.firstName,
    //   lastName: user.lastName
    // };

    user._id = new Date().getTime().toString();
    users.push(user);
    // users.push(newUser);
    // if (newUser) {
    //   res.status(200).json(newUser);
    // } else {
    //   res.sendStatus(500);
    // }
    res.json(user);
  }

  function findUserByUserName(req, res) {
    var username = req.query["username"];
    var user = null;

    if (username) {
      user = users.find(function (user) {
        return user.username === username;
      });
    }
    res.json(user);
  }

  function findUser(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];

    var user = null;

    if (username && password){
      user = users.find(function (user) {
        return user.username === username && user.password === password;
      });
    } else if (username){
      user = users.find(function (user) {
        return user.username === username;
      });
    }
    res.json(user);
  }

  function findUserById(req, res){
    var userId = req.params["userId"];
    var user = users.find(function (user) {
      return user._id === userId;
    });
    res.json(user);
  }

  function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;

    console.log(req.body);
    console.log("update user: " + userId + " " + user.username + " " + user.password + " " + user.firstName + " " + user.lastName);

    for(var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users[i].username = user.username;
        users[i].firstName = user.firstName;
        users[i].lastName = user.lastName;
        users[i].password = user.password;
        res.status(200).send(user);
        return;
      }
    }
    res.status(404).send("not found!");
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        var j = +i;
        users.splice(j, 1);
        res.json(users);
        return;
      }
    }
  }

};
