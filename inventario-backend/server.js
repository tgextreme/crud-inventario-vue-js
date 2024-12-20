// Archivo: server.js

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Configurar conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'usuario123',
  database: 'inventario'
});

db.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    process.exit(1);
  }
  console.log('Conectado a la base de datos MySQL');
});

// Middleware
app.use(cors());
app.use(express.json());

// Rutas CRUD para Aula
app.get('/api/aulas', (req, res) => {
  const query = 'SELECT * FROM Aula';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/aulas', (req, res) => {
  const { Numeracion, Descripcion, IP } = req.body;
  const query = 'INSERT INTO Aula (Numeracion, Descripcion, IP) VALUES (?, ?, ?)';
  db.query(query, [Numeracion, Descripcion, IP], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.status(201).send({ idAula: result.insertId });
    }
  });
});

app.put('/api/aulas/:id', (req, res) => {
  const { id } = req.params;
  const { Numeracion, Descripcion, IP } = req.body;
  const query = 'UPDATE Aula SET Numeracion = ?, Descripcion = ?, IP = ? WHERE idAula = ?';
  db.query(query, [Numeracion, Descripcion, IP, id], err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.sendStatus(204);
    }
  });
});

app.delete('/api/aulas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Aula WHERE idAula = ?';
  db.query(query, [id], err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.sendStatus(204);
    }
  });
});

// Rutas CRUD para Categoria
app.get('/api/categorias', (req, res) => {
  const query = 'SELECT * FROM Categoria';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/categorias', (req, res) => {
  const { Nombre, Descripcion, Estado } = req.body;
  const query = 'INSERT INTO Categoria (Nombre, Descripcion, Estado) VALUES (?, ?, ?)';
  db.query(query, [Nombre, Descripcion, Estado], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.status(201).send({ idCategoria: result.insertId });
    }
  });
});

app.put('/api/categorias/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre, Descripcion, Estado } = req.body;
  const query = 'UPDATE Categoria SET Nombre = ?, Descripcion = ?, Estado = ? WHERE idCategoria = ?';
  db.query(query, [Nombre, Descripcion, Estado, id], err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.sendStatus(204);
    }
  });
});

app.delete('/api/categorias/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Categoria WHERE idCategoria = ?';
  db.query(query, [id], err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.sendStatus(204);
    }
  });
});

// Rutas CRUD para Producto
app.get('/api/productos', (req, res) => {
  const query = 'SELECT * FROM Producto';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/productos', (req, res) => {
  const { Descripcion, EAN, keyRFID } = req.body;
  const query = 'INSERT INTO Producto (Descripcion, EAN, keyRFID) VALUES (?, ?, ?)';
  db.query(query, [Descripcion, EAN, keyRFID], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.status(201).send({ idProducto: result.insertId });
    }
  });
});

app.put('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const { Descripcion, EAN, keyRFID } = req.body;
  const query = 'UPDATE Producto SET Descripcion = ?, EAN = ?, keyRFID = ? WHERE idProducto = ?';
  db.query(query, [Descripcion, EAN, keyRFID, id], err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.sendStatus(204);
    }
  });
});

app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Producto WHERE idProducto = ?';
  db.query(query, [id], err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.sendStatus(204);
    }
  });
});

// Rutas CRUD para Marcajes
app.get('/api/marcajes', (req, res) => {
  const query = 'SELECT * FROM Marcajes';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/marcajes', (req, res) => {
  const { idProducto, idAula, Tipo, TimeStamp } = req.body;
  const query = 'INSERT INTO Marcajes (idProducto, idAula, Tipo, TimeStamp) VALUES (?, ?, ?, ?)';
  db.query(query, [idProducto, idAula, Tipo, TimeStamp], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.status(201).send({ idMarcaje: result.insertId });
    }
  });
});

// Rutas CRUD para ProductoPorCategoria
app.get('/api/productoporcategoria', (req, res) => {
  const query = 'SELECT * FROM ProductoPorCategoria';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/productoporcategoria', (req, res) => {
  const { idProducto, idCategoria } = req.body;
  const query = 'INSERT INTO ProductoPorCategoria (idProducto, idCategoria) VALUES (?, ?)';
  db.query(query, [idProducto, idCategoria], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.status(201).send({ idProducto: result.insertId, idCategoria });
    }
  });
});

app.delete('/api/productoporcategoria', (req, res) => {
  const { idProducto, idCategoria } = req.body;
  const query = 'DELETE FROM ProductoPorCategoria WHERE idProducto = ? AND idCategoria = ?';
  db.query(query, [idProducto, idCategoria], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    } else {
      res.sendStatus(204);
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

