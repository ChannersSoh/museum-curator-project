import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const API_URL = "https://museum-curator-backend.onrender.com";

export default function CollectionExhibits() {
  const { id } = useParams();
  const [exhibits, setExhibits] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchCollectionExhibits = async () => {
      try {
        const response = await axios.get(`${API_URL}/collections/${id}/exhibits`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched exhibits:", response.data);

        setCollectionName(response.data.collection.name);
        setExhibits(response.data.exhibits || []); 
      } catch (err) {
        console.error("Failed to fetch collection exhibits:", err);
        setError("Failed to load exhibits. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionExhibits();
  }, [id, token]);

  if (loading) 
    return <p className="text-center text-gray-900 dark:text-gray-100">Loading exhibits...</p>;
  
  if (error) 
    return <p className="text-center text-red-500 dark:text-red-400">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        {collectionName || "Collection"} Exhibits
      </h1>

      {exhibits.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300 text-center">No exhibits in this collection.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {exhibits.map((exhibit) => (
            <Card
              key={exhibit.id}
              id={exhibit.id}
              title={exhibit.title}
              creator={exhibit.creator || "Unknown"}
              imageUrl={exhibit.imageUrl || exhibit.image_url || "https://via.placeholder.com/150"}
              description={exhibit.description || "No description available"}
              collection={exhibit.collection}
              culture={exhibit.culture}
              date={exhibit.date}
            />
          ))}
        </div>
      )}
    </div>
  );
}
