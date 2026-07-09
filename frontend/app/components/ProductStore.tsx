"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function ProductStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [qty, setQty] = useState<Record<number, number>>({});

  const loadProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products");

      if (!res.ok) {
        throw new Error("Failed to load products");
      }

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const buy = async (product: Product) => {
    const quantity = qty[product.id] || 1;

    try {
      const res = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity,
        }),
      });

      if (res.ok) {
        alert("Purchase Successful!");
      } else {
        alert("Purchase Failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
      }}
    >
      <h1>Products</h1>

      {products.length === 0 && (
        <p>No products found.</p>
      )}

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid white",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h2>{product.name}</h2>

          <p>{product.description}</p>

          <h3>₱{product.price}</h3>

          <input
            type="number"
            min={1}
            value={qty[product.id] || 1}
            onChange={(e) =>
              setQty({
                ...qty,
                [product.id]: Number(e.target.value),
              })
            }
            style={{
              width: "70px",
              marginRight: "10px",
            }}
          />

          <button onClick={() => buy(product)}>
            Buy
          </button>
        </div>
      ))}
    </div>
  );
}
