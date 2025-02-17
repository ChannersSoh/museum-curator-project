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

  if (loading) return <p>Loading exhibit details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{exhibit.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={exhibit.imageUrl}
          alt={exhibit.title}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div>
          <p><strong>Creator:</strong> {exhibit.creator}</p>
          <p><strong>Collection:</strong> {exhibit.collection}</p>
          <p><strong>Date Created:</strong> {exhibit.date}</p>
          <p><strong>Medium:</strong> {exhibit.medium}</p>
          <p><strong>Culture:</strong> {exhibit.culture}</p>
          <p><strong>Period:</strong> {exhibit.styleOrPeriod}</p>
          <p><strong>Description:</strong> {exhibit.description || "No description available"}</p>

          {token && (
            <div className="mt-4">
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="">Select Collection</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
              <div className="mt-2 flex gap-2">
                <button onClick={handleAddToCollection} className="px-4 py-2 bg-green-500 text-black rounded">
                  Add to Collection
                </button>
                <button onClick={handleRemoveFromCollection} className="px-4 py-2 bg-red-500 text-black rounded">
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
