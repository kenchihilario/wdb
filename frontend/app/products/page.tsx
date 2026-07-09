"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
};

export default function ProductsPage() {
  const API = "http://localhost:8000/api/products";

  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  const loadProducts = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const saveProduct = async () => {
    if (editingId === null) {
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      setEditingId(null);
    }

    setForm({
      name: "",
      description: "",
      price: "",
    });

    loadProducts();
  };

  const editProduct = (product: Product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
    });
  };

  const deleteProduct = async (id: number) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    loadProducts();
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Products CRUD</h1>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <br /><br />

      <button onClick={saveProduct}>
        {editingId ? "Update Product" : "Save Product"}
      </button>

      <hr />

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <p>₱{product.price}</p>

          <button onClick={() => editProduct(product)}>Edit</button>

          <button
            onClick={() => deleteProduct(product.id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
