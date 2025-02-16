import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const API_URL = "https://museum-curator-backend.onrender.com/api/exhibits";
const EXHIBITS_PER_PAGE = 20;

export default function Exhibits() {
  const [exhibits, setExhibits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);

  const [collection, setCollection] = useState("");
  const [culture, setCulture] = useState("");
  const [medium, setMedium] = useState("");

  useEffect(() => {
    const fetchExhibits = async () => {
      setLoading(true);
      setError(null);
      setExhibits([]);
  
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("pageSize", EXHIBITS_PER_PAGE.toString());
  
        if (collection.trim() !== "") params.append("collection", collection);
        if (culture.trim() !== "") params.append("culture", culture);
        if (medium.trim() !== "") params.append("medium", medium);
  
        const { data } = await axios.get(`${API_URL}?${params.toString()}`);
        setExhibits(data.exhibits);
      } catch {
        setError("Failed to fetch exhibits");
      } finally {
        setLoading(false);
      }
    };
  
    fetchExhibits();
  }, [page, collection, culture, medium]);
  
  
  
  const handlePagination = (newPage) => {
    if (newPage > 0) {
      setPage(newPage);
      setInputPage(newPage);
    }
  };

  const handlePageInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handlePageInputSubmit = () => {
    const pageNum = Number(inputPage);
    if (pageNum > 0) {
      setPage(pageNum);
    } else {
      setInputPage(page);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Exhibits</h1>

      <div className="flex gap-4 mb-4">

        <select value={collection} onChange={(e) => setCollection(e.target.value)} className="p-2 border border-gray-300 rounded">
          <option value="">Filter by Collection</option>
          <option value="Coins">Coins</option>
          <option value="Drawings">Drawings</option>
          <option value="Paintings">Paintings</option>
          <option value="Photographs">Photographs</option>
          <option value="Prints">Prints</option>
          <option value="Sculpture">Sculpture</option>
        </select>

        <select value={culture} onChange={(e) => setCulture(e.target.value)} className="p-2 border border-gray-300 rounded">
          <option value="">Filter by Culture</option>
          <option value="American">American</option>
          <option value="British">British</option>
          <option value="Chinese">Chinese</option>
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Roman">Roman</option>
        </select>

        <select value={medium} onChange={(e) => setMedium(e.target.value)} className="p-2 border border-gray-300 rounded">
          <option value="">Filter by Medium</option>
          <option value="silver">Silver</option>
          <option value="Wood">Wood</option>
          <option value="Paper">Paper</option>
          <option value="bronze">Bronze</option>
          <option value="marble">Marble</option>
          <option value="Watercolor">Watercolor</option>
        </select>

        <button
          onClick={() => {
            setCollection("");
            setCulture("");
            setMedium("");
          }}
          className="px-4 py-2 bg-red-500 text-black rounded"
        >
          Reset Filters
        </button>
      </div>


      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exhibits.map(({ id, title, creator, imageUrl, description, collection, culture, date }) => (
        <Card
          key={id}
          id={id}
          title={title}
          creator={creator}
          imageUrl={imageUrl}
          description={description || "No description available"}
          collection={collection}
          culture={culture} 
          date={date}
        />
        ))}
      </div>

      <div className="flex justify-between mt-6 items-center">
        <button
          onClick={() => handlePagination(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-500 text-black rounded disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex items-center space-x-2">
          <span>Page</span>
          <input
            type="number"
            value={inputPage}
            onChange={handlePageInputChange}
            onBlur={handlePageInputSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePageInputSubmit();
              }
            }}
            className="w-16 text-center p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={() => handlePagination(page + 1)}
          className="px-4 py-2 bg-gray-500 text-black rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
