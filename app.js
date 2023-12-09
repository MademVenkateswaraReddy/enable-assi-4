const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());

let tasks = [
  { id: 1, name: 'Task 1', description: 'Description for Task 1', status: 'Incomplete' },
  { id: 2, name: 'Task 2', description: 'Description for Task 2', status: 'Complete' }
];


app.get('/tasks', (req, res) => {
  res.json(tasks);
});


app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});


app.post('/tasks', (req, res) => {
  const { name, description, status } = req.body;

  if (!name || !description || !status) {
    return res.status(400).json({ error: 'Name, description, and status are required' });
  }

  const newTask = {
    id: tasks.length + 1,
    name,
    description,
    status
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { name, description, status } = req.body;

  if (name) {
    tasks[taskIndex].name = name;
  }

  if (description) {
    tasks[taskIndex].description = description;
  }

  if (status) {
    tasks[taskIndex].status = status;
  }

  res.json(tasks[taskIndex]);
});


app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.json({ message: 'Task deleted successfully' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
