// backend.js
import express from "express";
import cors from "cors";


const app = express();
const port = 8000;

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

app.use(cors());
app.use(express.json());

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
      (user) => user["name"] === name && user["job"] === job
    );
  };

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const deleteUser = (userid, useridx) => {
    if (useridx !== -1) {
        users.users_list.splice(useridx, 1); // Remove the user from the list
        //tried adding some status codes, hopefully these are good codes for debugging
        return {status: 200, message: `User with id ${userid} deleted.` };
      } else {
        return {status: 404, message: `User with id ${userid} not found.` };
      }
};


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job != undefined) {
    const result = findUserByNameAndJob(name, job);
    res.send(result);
  }
  else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});
  
  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
  });

  app.delete("/users", (req, res) => {
    const userid = req.body.id; // Extract id from the request body
    const useridx = users.users_list.findIndex((user) => user.id === userid);
    deleteUser(userid, useridx);
    res.send();
  });
  
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
