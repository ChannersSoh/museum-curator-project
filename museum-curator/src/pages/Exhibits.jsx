import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react"; 
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
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Ensures fetchExhibits always fetches the latest data
  const fetchExhibits = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("pageSize", EXHIBITS_PER_PAGE.toString());

      if (collection.trim()) params.append("collection", collection);
      if (culture.trim()) params.append("culture", culture);
      if (medium.trim()) params.append("medium", medium);

      const { data } = await axios.get(`${API_URL}?${params.toString()}`);
      setExhibits(data.exhibits || []);
      setTotalPages(Math.ceil(data.totalCount / EXHIBITS_PER_PAGE));
    } catch {
      setError("Failed to fetch exhibits");
    } finally {
      setLoading(false);
    }
  }, [page, collection, culture, medium]);

  // ✅ Ensures exhibits refresh correctly on page/filter change
  useEffect(() => {
    fetchExhibits();
  }, [fetchExhibits]);

  // ✅ Handle pagination properly
  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      setInputPage(newPage);
    }
  };

  // ✅ Handle manual page input
  const handlePageInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handlePageInputSubmit = () => {
    const pageNum = Number(inputPage);
    if (pageNum > 0 && pageNum <= totalPages) {
      setPage(pageNum);
    } else {
      setInputPage(page);
    }
  };

  // ✅ Reset filters properly
  const handleResetFilters = () => {
    setCollection("");
    setCulture("");
    setMedium("");
    setPage(1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        Exhibits
      </h1>

      <button
        onClick={() => setFiltersVisible(!filtersVisible)}
        className="flex items-center justify-center gap-2 bg-gray-900 text-gray-100 px-4 py-2 rounded-md w-full sm:w-auto mb-4"
      >
        {filtersVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        {filtersVisible ? "Hide Filters" : "Show Filters"}
      </button>

      {filtersVisible && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 transition-all duration-300">
          <select
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md"
          >
            <option value="">Filter by Collection</option>
            <option value="Coins">Coins</option>
            <option value="Drawings">Drawings</option>
            <option value="Paintings">Paintings</option>
            <option value="Photographs">Photographs</option>
            <option value="Prints">Prints</option>
            <option value="Sculpture">Sculpture</option>
          </select>

          <select
            value={culture}
            onChange={(e) => setCulture(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md"
          >
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

          <select
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md"
          >
            <option value="">Filter by Medium</option>
            <option value="silver">Silver</option>
            <option value="Wood">Wood</option>
            <option value="Paper">Paper</option>
            <option value="bronze">Bronze</option>
            <option value="marble">Marble</option>
            <option value="Watercolor">Watercolor</option>
          </select>

          <div className="col-span-1 sm:col-span-3 flex justify-center">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-full max-w-sm mx-auto">
                  <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 animate-pulse mb-4"></div>
                  <div className="w-3/4 h-5 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
                  <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
                  <div className="w-full h-12 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
                </div>
              ))
          : exhibits.map(({ id, title, creator, imageUrl, description, collection, culture, date }) => (
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

      <div className="flex flex-col sm:flex-row justify-center mt-8 items-center space-y-4 sm:space-y-0">
        <button
          onClick={() => handlePagination(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-gray-900 dark:text-gray-100">Page</span>
          <input
            type="number"
            value={inputPage}
            onChange={handlePageInputChange}
            onBlur={handlePageInputSubmit}
            onKeyDown={(e) => e.key === "Enter" && handlePageInputSubmit()}
            className="w-16 text-center p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md"
          />
        </div>

        <button
          onClick={() => handlePagination(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
