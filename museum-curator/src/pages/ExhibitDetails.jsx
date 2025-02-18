import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "https://museum-curator-backend.onrender.com";

export default function ExhibitDetails() {
  const { id } = useParams();
  const [exhibit, setExhibit] = useState(null);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExhibit = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/exhibits/${id}`);
        setExhibit(response.data.exhibit);
      } catch (err) {
        setError("Failed to fetch exhibit details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

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

    fetchExhibit();
    fetchCollections();
  }, [id, token]);

  const handleAddToCollection = async () => {
    if (!selectedCollection) return alert("Select a collection first!");

    try {
      await axios.post(
        `${API_URL}/collections/save`,
        {
          collectionId: selectedCollection,
          exhibitId: exhibit.id,
          title: exhibit.title,
          institution: exhibit.institution,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Exhibit added successfully!");
    } catch (err) {
      console.error("Error adding exhibit:", err);
      alert("Failed to add exhibit.");
    }
  };

  const handleRemoveFromCollection = async () => {
    if (!selectedCollection) return alert("Select a collection first!");

    try {
      await axios.delete(`${API_URL}/collections/exhibits`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { collectionId: selectedCollection, exhibitId: exhibit.id },
      });
      alert("Exhibit removed successfully!");
    } catch (err) {
      console.error("Error removing exhibit:", err);
      alert("Failed to remove exhibit.");
    }
  };

  if (loading) return <p className="text-center text-gray-900 dark:text-gray-100">Loading exhibit details...</p>;
  if (error) return <p className="text-center text-red-500 dark:text-red-400">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        {exhibit.title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={exhibit.imageUrl}
          alt={exhibit.title}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-gray-900 dark:text-gray-100"><strong>Creator:</strong> {exhibit.creator}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Collection:</strong> {exhibit.collection}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Date Created:</strong> {exhibit.date}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Medium:</strong> {exhibit.medium}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Culture:</strong> {exhibit.culture}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Period:</strong> {exhibit.styleOrPeriod}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Description:</strong> {exhibit.description || "No description available"}</p>

          {token && (
            <div className="mt-6">
              <label className="block text-gray-900 dark:text-gray-100 mb-2">Add to Collection:</label>
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md"
              >
                <option value="">Select Collection</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
              <div className="mt-4 flex flex-wrap gap-2">
                <button 
                  onClick={handleAddToCollection} 
                  className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-md hover:bg-green-600 dark:hover:bg-green-700 transition"
                >
                  Add to Collection
                </button>
                <button 
                  onClick={handleRemoveFromCollection} 
                  className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition"
                >
                  Remove from Collection
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
