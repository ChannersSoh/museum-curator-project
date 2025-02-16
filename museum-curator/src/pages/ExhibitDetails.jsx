import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 

export default function ExhibitDetails() {
  const { id } = useParams(); 
  const [exhibit, setExhibit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching exhibit with ID:", id);
    const fetchExhibit = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://museum-curator-backend.onrender.com/api/exhibits/${id}`
        );
        setExhibit(response.data.exhibit);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch exhibit details.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchExhibit();
  }, [id]);

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
          <p className="text-gray-700"><strong>Creator:</strong> {exhibit.creator}</p>
          <p className="text-gray-700"><strong>Collection:</strong> {exhibit.collection}</p>
          <p className="text-gray-700"><strong>Date Created:</strong> {exhibit.date}</p>
          <p className="text-gray-700"><strong>Medium:</strong> {exhibit.medium}</p>
          <p className="text-gray-700"><strong>Culture:</strong> {exhibit.culture}</p>
          <p className="text-gray-700"><strong>Period:</strong> {exhibit.styleOrPeriod}</p>
          <p className="text-gray-700"><strong>Description:</strong> {exhibit.description || "No description available"}</p>
        </div>
      </div>
    </div>
  );
}
