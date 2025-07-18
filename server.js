const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const Event = require('./models/event');
const { User, Category, Event, RSVP, Comment } = require('./models');
const sequelize = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/events', async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
});

app.post('/api/events', async (req, res) => {
  const { title, description, category, date, location, lat, lng } = req.body;
  const event = await Event.create({ title, description, category, date, location, lat, lng });
  res.json(event);
});
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('API работает!');
});

sequelize.sync({ alter: true }) // alter: true для автоматического обновления схемы
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Ошибка при синхронизации базы данных:', err);
  });

  const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./db');

const { User, Category, Event, RSVP, Comment } = require('./models');


app.use(cors());
app.use(bodyParser.json());

//
// 🔽🔽🔽 РОУТЫ ПИШЕМ ЗДЕСЬ 🔽🔽🔽
//

// Получить все категории
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении категорий' });
  }
});

// Добавить новую категорию
app.post('/api/categories', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании категории' });
  }
});

// Добавить RSVP
app.post('/api/events/:eventId/rsvp', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId, status } = req.body;

    const [rsvp, created] = await RSVP.findOrCreate({
      where: { userId, eventId },
      defaults: { status },
    });

    if (!created) {
      rsvp.status = status;
      await rsvp.save();
    }

    res.json(rsvp);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка RSVP' });
  }
});

//
// 🔼🔼🔼 РОУТЫ — ЗДЕСЬ ЗАКАНЧИВАЮТСЯ 🔼🔼🔼
//

// Синхронизация БД и запуск сервера
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Ошибка при синхронизации:', err);
  });

  // Создать или обновить RSVP
app.post('/api/events/:eventId/rsvp', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId, status } = req.body;

    const [rsvp, created] = await RSVP.findOrCreate({
      where: { userId, eventId },
      defaults: { status },
    });

    if (!created) {
      rsvp.status = status;
      await rsvp.save();
    }

    res.json(rsvp);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении RSVP' });
  }
});





// Добавить комментарий к событию
app.post('/api/events/:eventId/comments', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId, text } = req.body;

    const comment = await Comment.create({
      eventId,
      userId,
      text,
    });

    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при добавлении комментария' });
  }
});



