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

  useEffect(() => {
    const fetchExhibits = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `${API_URL}?page=${page}&pageSize=${EXHIBITS_PER_PAGE}`
        );
        setExhibits(data.exhibits);
      } catch {
        setError("Failed to fetch exhibits");
      } finally {
        setLoading(false);
      }
    };

    fetchExhibits();
  }, [page]);

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

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exhibits.map(({ id, title, creator, imageUrl, description, collection, date }) => (
          <Card
            key={id}
            id={id}
            title={title}
            creator={creator}
            imageUrl={imageUrl}
            description={description || "No description available"}
            collection={collection}
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
