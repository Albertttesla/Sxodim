require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/send', (req, res) => {
  const { title, description, date, location, contact } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASS
    }
  });

  const mailOptions = {
    from: `"Форма мероприятия" <${process.env.MY_EMAIL}>`,
    to: 'ВАША_ПОЧТА@пример.com', // ← сюда придёт письмо
    subject: `Новое мероприятие: ${title}`,
    html: `
      <h2>Новое мероприятие</h2>
      <p><b>Название:</b> ${title}</p>
      <p><b>Описание:</b> ${description}</p>
      <p><b>Дата:</b> ${date}</p>
      <p><b>Место:</b> ${location}</p>
      <p><b>Контакт:</b> ${contact}</p>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      return res.send("Ошибка при отправке.");
    }
    res.redirect('/create.html'); // можно заменить на "спасибо.html"
  });
});

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
