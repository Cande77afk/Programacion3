// Importar el módulo Express
const express = require('express');
const mongoose = require('mongoose');

// Crear una aplicación Express
const app = express();

app.use(express.json());

//conexcion
main().catch(err => console.log(err));

mongoose.connect('mongodb://127.0.0.1:27017/test');
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    validate: {
      validator: function(v){
        return v > 0;
      },
      message: props => 'el precio debe ser mayor que 0'
    }
  },
  available: Boolean
});
const Item = mongoose.model('Item', itemSchema);

async function main() {
  
  

  /* const monsterClasica = new Item({ name: 'monster clasica', price: 2000, available: true });
  console.log(monsterClasica.name);
  await monsterClasica.save(); */

  /* const gatos = await Gato.find();
  console.log(gatos); */

  /* const pupos = await Gato.find({ name: /^pu/ });
  console.log(pupos); */
}

// Definir una ruta simple para la página principal
app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Este es mi servidor HTTP con Express en Node.js');
});

// Obtener lista de ítems
app.get('/api/items', async (req, res) => {
  var items = await Item.find();
    res.json(items);
  });  

  app.get('/api/itemscaros', async (req, res) => {
    var items = await Item.find({price: { $gte: 2000 } }).exec();
      res.json(items);
    });  

  app.get('/api/items/:id', async (req, res) => {
    const itemId = req.params.id;
    var item = await Item.find({'_id':itemId});
    res.json(item);
  });  

    
   
app.post('/api/items', async (req, res) => {

  const item = new Item({ name: req.body.name , price: req.body.price, available: req.body.available });
  console.log(item.name);

  try {
   await item.save();
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Mostrar mensajes de error de validación
      for (const field in error.errors) {
        console.log(error.errors[field].message);
        return res.status(400).json({'error': error.errors[field].message});
      }
    } else {
      console.log('Error al crear el ítem:', error);
      return res.status(400).json({'error': error});
    }
  }
  
  return res.status(201).json(item);
  
    
  });  

app.put('/api/items/:id', async (req, res) => {
    const itemId = req.params.id;
    let doc;
   /*  const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ "error": 'Ítem no encontrado' });
      } */
    try {
      doc = await Item.findOneAndUpdate({'_id':itemId},{ name: req.body.name , price: req.body.price, available: req.body.available });

    } catch (error) {
      return res.status(404).json({'error': error});
    }
      return res.json(doc);
  }); 
  
  app.put('/api/items/aumentar/:id', async (req, res) => {
    const itemId = req.params.id;
    let doc;
   /*  const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ "error": 'Ítem no encontrado' });
      } */
        var item = await Item.find({'_id':itemId});
        console.log(item);
        item = item[0];
        item.price = item.price + item.price * 0.10;
        console.log(item);


    try {
      doc = await Item.findOneAndUpdate({'_id':itemId},{price: item.price});

    } catch (error) {
      return res.status(404).json({'error': error});
    }
      return res.json(doc);
  });
  app.delete('/api/items/:id', async (req, res) => {
    const itemId = req.params.id;
    let response;
    try {
      response = await Item.deleteOne({'_id':itemId});
    } catch (error) {
      return res.status(404).json({'error': error});
    }
    
      res.json(response);
  });  

// Configurar el puerto en el que va a escuchar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
