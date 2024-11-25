import React, { useState, useEffect } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
              setProducts(json)
            })
            .catch(error => {
              console.error('Error fetching products:', error);
            });
  }, []);

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

/* export default function ProductList() {
  const [products, setProducts] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    fetch('http://localhost:3001/api/items')
            .then(res=>res.json())
            .then(json=>{
              setProducts(json)
            })
            .catch(error => {
              console.error('Error fetching products:', error);
            });
  }, []);

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
} */