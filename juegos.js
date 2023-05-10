const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost:27017/juegos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected!');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});


const juegoSchema = new mongoose.Schema({
  titulo: String,
  genero: String,
  plataforma: String
});


const Juego = mongoose.model('Juego', juegoSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  const juego = new Juego({
    titulo: req.body.titulo,
    genero: req.body.genero,
    plataforma: req.body.plataforma
  });

  juego.save().then(() => {
    console.log('Juego guardado');
    res.redirect('/');
  }).catch((error) => {
    console.error('Error al guardar el juego:', error);
  });
});


app.get('/juegos', (req, res) => {
  Juego.find().then((juegos) => {
    res.render('juegos', { juegos });
  }).catch((error) => {
    console.error('Error al recuperar los juegos:', error);
  });
});


app.listen(3000, () => {
  console.log('Servidor web iniciado en el puerto 3000');
});
