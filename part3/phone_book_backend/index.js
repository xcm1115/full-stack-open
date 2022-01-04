const express = require("express");
const moment = require('moment');
const app = express();
const PORT = 9000;

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

const generateId = () => {
  return Math.ceil(Math.random() * 100000);
}

const getNowTime = () => {
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const date = new Date();
  const nowYear = date.getFullYear();
  const nowMonth = date.getMonth();
  const nowDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const weekDay = date.getDay();
  const nowTime = moment(Date.now() + 8 * 60 * 60 * 1000).format('HH:mm:ss');

  return `${week[weekDay]} ${month[nowMonth]} ${nowDay} ${nowYear} ${nowTime} GMT+8 (Chinese standard time)`;
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World !<h1>');
})

app.get('/api/persons', (req, res) => {
  res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(item => item.id === id);

  if (person) {
    if (!person.name || !person.number) {
      res.status(202).json({
        error: 'Part of the user’s data is missing.'
      });
    } else {
      res.json(person);
    }
  } else {
    res.status(404).end();
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  persons = persons.filter(item => item.id !== id);
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const person = req.body;

  if (persons.some(item => item.name === person.name)) {
    res.status(202).json({
      error: 'Name must be unique.'
    });
  } else {
    console.log(person);
    person.id = generateId();
    persons = [...persons, person];

    res.json(person);
  }
})

app.get('/info', (req, res) => {
  const count = persons.length;
  const now = getNowTime();

  res.send(`<p>Phonebooks has info for ${count} people</p><p>${now}</p>`);
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ...`);
})

