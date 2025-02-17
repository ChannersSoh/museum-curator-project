import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://museum-curator-backend.onrender.com";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCollections();
  }, [token]);

  const fetchCollections = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${API_URL}/collections`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCollections(response.data);
    } catch (err) {
      console.error("Failed to fetch collections:", err);
    }
  };

  const createCollection = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${API_URL}/collections`,
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCollections([...collections, response.data]);
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Failed to create collection:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Collections</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Collection Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button onClick={createCollection} className="bg-blue-500 text-black p-2 rounded">
          Create
        </button>
      </div>

      <ul className="space-y-2">
  {collections.map((collection) => (
    <li key={collection.id} className="p-4 border border-gray-300 rounded flex justify-between items-center">
      <div>
        <Link to={`/collections/${collection.id}`} className="text-blue-500 underline">
          <strong>{collection.name}</strong>
        </Link>
        <p className="text-gray-600">{collection.description}</p>
      </div>
      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
        {collection.exhibitCount || 0} {collection.exhibitCount === 1 ? "exhibit" : "exhibits"}
      </span>
    </li>
  ))}
</ul>
    </div>
  );
}
