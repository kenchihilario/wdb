"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const API = "http://localhost:8000/api/products";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const loadProducts = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const clearForm = () => {
    setEditing(null);
    setName("");
    setDescription("");
    setPrice("");
  };

  const saveProduct = async () => {
    const body = {
      name,
      description,
      price: Number(price),
    };

    if (editing === null) {
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`${API}/${editing}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });
    }

    clearForm();
    loadProducts();
  };

  const editProduct = (product: Product) => {
    setEditing(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    loadProducts();
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: 40,
      }}
    >
      <h1>Admin Dashboard</h1>

      <h2>{editing ? "Edit Product" : "Add Product"}</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br />
      <br />

      <button onClick={saveProduct}>
        {editing ? "Update Product" : "Add Product"}
      </button>

      {editing && (
        <button
          style={{ marginLeft: 10 }}
          onClick={clearForm}
        >
          Cancel
        </button>
      )}

      <hr />

      <h2>Products</h2>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid white",
            borderRadius: 10,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <strong>₱{product.price}</strong>

          <br />
          <br />

          <button onClick={() => editProduct(product)}>
            Edit
          </button>

          <button
            onClick={() => deleteProduct(product.id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}
