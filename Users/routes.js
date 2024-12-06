import * as dao from "./dao.js";
export default function UserRoutes(app) {

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  app.post("/api/users/signin", signin);

  //The signup route expects a user object with at least the properties username and password. The DAO's findUserByUsername is called to check if a user with that username already exists. If such a user is found a 400 error status is returned along with 1an error message for display in the user interface. If the username is not already taken the user is inserted into the database and stored in the currentUser server variable. The response includes the newly created user. The signup route is mapped to the api/users/signup path.
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  
  app.post("/api/users/signup", signup);


  const profile = async (req, res) => {
    //If a user has already signed in, the currentUser can be retrieved from the session by using the profile route as shown below. If there is no currentUser, an error is returned.
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    res.json(currentUser);
  };
  app.post("/api/users/profile", profile);



  const signout = async (req, res) => {
    // currentUser = null;
    req.session.destroy(); //Users can be signed out by destroying the session.
    res.sendStatus(200);
  };
  app.post("/api/users/signout", signout);

  //a restful API that can make users make new users!
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);

  //make the DAO function available as a RESTful Web API. Map a route that accepts a user's primary key as a path parameter, passes the ID and request body to the DAO function and responds with the status.
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
      //If a user updates their profile, then the session must be kept in synch.
    }
    res.json(currentUser);
  };
  app.put("/api/users/:userId", updateUser);

  //makes the deletuser option available from the DAO as a restful API for integration with the user interface which encodes the id of the user to remove as a path parameter.
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  app.delete("/api/users/:userId", deleteUser);

}

