// Importar el módulo Express
const express = require('express');

// Crear una aplicación Express
const app = express();

app.use(express.json());

// Lista de ítems ficticios
let items = [
    { id: 1, name: 'Item 1', description: 'Descripción del Item 1' },
    { id: 2, name: 'Item 2', description: 'Descripción del Item 2' }
  ];

// Definir una ruta simple para la página principal
app.get('/', (req, res) => {
  res.send('¡Hola!');
});

// Obtener lista de ítems
app.get('/api/items', (req, res) => {
    res.json(items);
  });  

app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
        description: req.body.description
      };
      items.push(newItem);
      res.status(201).json(newItem);
    
  });  

app.put('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      items[itemIndex] = {
        id: itemId,
        name: req.body.name,
        description: req.body.description
      };
      res.json(items[itemIndex]);
    } else {
      res.status(404).send('Ítem no encontrado');
    }
  
  });  
  app.delete('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        res.status(204).send();
      } else {
        res.status(404).send('Ítem no encontrado');
      }
    
  });  

// Configurar el puerto en el que va a escuchar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
