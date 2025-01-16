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
  
const generateRandomId = () => {
    return Math.random().toString(36).substr(6);
}


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
    const newUser = {
      id: generateRandomId(), 
      name: userToAdd.name,
      job: userToAdd.job,
    };
    addUser(newUser);
    res.status(201).send(newUser);
  });
  app.delete("/users/:id", (req, res) => {
    console.log("DELETE request received for ID:", req.params.id);
    const userid = req.params.id;
    const userIndex = users.users_list.findIndex((user) => user.id === userid);
  
    if (userIndex !== -1) {
      users.users_list.splice(userIndex, 1); // Remove the user
      console.log(`User with ID ${userid} deleted.`);
      res.status(204).send(); // Success, no content
    } else {
      console.log(`User with ID ${userid} not found.`);
      res.status(404).send({ message: `User with id ${userid} not found.` });
    }
  });
  

  
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
