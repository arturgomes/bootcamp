const express = require('express');
const server = express();
server.use(express.json());

const projects = [{
  "id": "1",
  "title": "novo projeto",
  "tasks": []
},
{
  "id": "2",
  "title": "novo projeto",
  "tasks": []
},
{
  "id": "3",
  "title": "novo projeto titulo",
  "tasks": []
},
{
  "id": "4",
  "title": "novo projeto",
  "tasks": []
}];
var requests = 0;
// Middlewares
// Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto nos parâmetros da URL que verifica se o projeto com aquele ID existe. Se não existir retorne um erro, caso contrário permita a requisição continuar normalmente;

function checkIdExists(req, res, next) {
  const { id } = req.params;
  function findIdonProject(id) {
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].id == id) {
        return next();
      }
    }
    return res.status(400).json({ error: "id not found on request params" });
  }
  findIdonProject(id);

}
// Crie um middleware global chamado em todas requisições que imprime(console.log) uma contagem de quantas requisições foram feitas na aplicação até então;


function countRequests(req, res, next) {
  console.log("The number of requests so far is: " + requests++);
  return next();
}

// Rotas
// POST / projects: A rota deve receber id e title dentro corpo de cadastrar um novo projeto dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] }; Certifique - se de enviar tanto o ID quanto o título do projeto no formato string com àspas duplas.
server.post('/projects', countRequests, (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  var proj = { id: id, title: title, tasks: [] }
  projects.push(proj);
  return res.json(projects);

})

//   GET / projects: Rota que lista todos projetos e suas tarefas;
server.get('/projects', countRequests, (req, res) => {
  return res.json(projects);
})

// PUT / projects /: id: A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;
server.put('/projects/:id', checkIdExists, countRequests, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  if (id > (projects.length)) {
    return res.status(400).json({ error: "id not found" });
  }

  projects[id].title = title;

  return res.json(projects);

})
// DELETE / projects /: id: A rota deve deletar o projeto com o id presente nos parâmetros da rota;
server.delete('/projects/:id', checkIdExists, countRequests, (req, res) => {
  const { id } = req.params;
  if (id > (projects.length)) {
    return res.status(400).json({ error: "id not found" });
  }
  projects.splice(id, 1);

  return res.json(projects);

})

// POST / projects /: id / tasks: A rota deve receber um campo title e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;
server.post('/projects/:id/tasks', checkIdExists, countRequests, (req, res) => {
  const { id } = req.params;
  if (id > (projects.length)) {
    return res.status(400).json({ error: "id not found" });
  }
  const { title } = req.body;
  projects[id].tasks.push(title);
  return res.json(projects);

})

server.listen(3333);