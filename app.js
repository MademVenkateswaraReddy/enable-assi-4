const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 2300;


app.use(bodyParser.json());

let tasks = [
  { id: 1, name: 'Venki', description: 'Full Stack Web Developer', status: 'Incomplete' },
  { id: 2, name: 'Geetha', description: 'Housewife', status: 'Complete' },
  { id: 3, name: 'Teja', description: 'Studying 1st standard', status: 'Incomplete' },
  { id: 4, name: 'Aswin', description: 'Studying Pre-KG', status: 'Complete' }
];


app.get('/', (req, res) => {
  res.json(tasks);
});


app.get('/', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});


app.post('/', (req, res) => {
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


app.put('/', (req, res) => {
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


app.delete('/', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.json({ message: 'Task deleted successfully' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
