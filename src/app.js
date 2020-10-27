const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

//const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
 return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title,url,tech} = request.body;
  const repo ={id:uuid(),title,url,tech,likes:0};

  repositories.push(repo);
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title,url,tech}= request.body;

  const repositoresIndex = repositories.findIndex(repo => repo.id===id);

  if(repositoresIndex < 0){
    return response.status(400).json({erro:"Repository not found"})
  }
  const repository ={
    id,
    title,
    url,
    tech,
    likes: repositories[repositoresIndex].likes
    };

    repositories[repositoresIndex]=repository;

    return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoresIndex = repositories.findIndex(repo => repo.id===id);

  if(repositoresIndex < 0){
    return response.status(400).json({erro:"Repository not found"})
  }
  repositories.splice(repositoresIndex,1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositoresIndex = repositories.findIndex(repo => repo.id===id);

  if(repositoresIndex < 0){
    return response.status(400).json({erro:"Repository not found"})
  }

  const repository ={
    id: repositories[repositoresIndex].id,
    title: repositories[repositoresIndex].title,
    url: repositories[repositoresIndex].url,
    tech: repositories[repositoresIndex].tech,
    likes: repositories[repositoresIndex].likes+=1
    };

    repositories[repositoresIndex]=repository;

    return response.json(repository);



});

module.exports = app;
