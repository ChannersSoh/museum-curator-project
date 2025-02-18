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
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        My Collections
      </h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Collection Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md"
        />
        <button
          onClick={createCollection}
          className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition"
        >
          Create
        </button>
      </div>

      <ul className="space-y-4">
          {collections.map((collection) => (
            <li
              key={collection.id}
              className="p-4 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div>
                <Link to={`/collections/${collection.id}`} className="text-blue-500 dark:text-blue-400 underline font-semibold">
                  {collection.name}
                </Link>
                <p className="text-gray-600 dark:text-gray-300">{collection.description}</p>
              </div>
              <span className="mt-2 sm:mt-0 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                {collection.exhibitCount || 0} {collection.exhibitCount === 1 ? "exhibit" : "exhibits"}
              </span>
            </li>
          ))}
        </ul>

    </div>
  );
}
