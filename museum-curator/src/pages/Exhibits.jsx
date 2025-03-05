import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react"; 
import Card from "../components/Card";

const API_URL = "https://museum-curator-backend.onrender.com/api/exhibits";
const EXHIBITS_PER_PAGE = 20;

export default function Exhibits() {
  const [exhibits, setExhibits] = useState([]);
  const [currentFetchId, setCurrentFetchId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const [collection, setCollection] = useState("");
  const [culture, setCulture] = useState("");
  const [medium, setMedium] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);

  const latestFetchId = useRef(0);

  useEffect(() => {
    console.log("Filters or searchQuery changed. Resetting page and exhibits.");
    setPage(1);
    setInputPage(1);
    setExhibits([]);
  }, [searchQuery, collection, culture, medium]);

  useEffect(() => {
    let isCurrent = true; 
    const controller = new AbortController();
    latestFetchId.current += 1;
    const fetchId = latestFetchId.current;
    console.log("Starting fetchExhibits with fetchId:", fetchId);

    const fetchExhibits = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("pageSize", EXHIBITS_PER_PAGE.toString());
        if (collection.trim()) params.append("collection", collection);
        if (culture.trim()) params.append("culture", culture);
        if (medium.trim()) params.append("medium", medium);
        if (searchQuery.trim()) params.append("query", searchQuery);

        const url = `${API_URL}?${params.toString()}`;
        console.log("Fetching exhibits from:", url);

        const { data } = await axios.get(url, { signal: controller.signal });
        console.log("Received response data for fetchId", fetchId, ":", data);

        if (isCurrent && fetchId === latestFetchId.current) {
          setExhibits(data.exhibits);
          setCurrentFetchId(fetchId);
          console.log("Exhibits state updated for fetchId", fetchId, ":", data.exhibits);
        } else {
          console.log("Ignoring response for stale fetchId:", fetchId);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError("Failed to fetch exhibits");
          console.error("Error fetching exhibits:", err);
        } else {
          console.log("Fetch cancelled for fetchId:", fetchId);
        }
      } finally {
        if (isCurrent && fetchId === latestFetchId.current) {
          setLoading(false);
          console.log("Loading set to false for fetchId:", fetchId);
        }
      }
    };

    fetchExhibits();

    return () => {
      isCurrent = false;
      controller.abort();
      console.log("Cleanup: Aborted fetchExhibits for fetchId:", fetchId);
    };
  }, [page, collection, culture, medium, searchQuery]);

  const handlePagination = (newPage) => {
    if (newPage > 0) {
      console.log("Paginating to page:", newPage);
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
      console.log("Page input submitted, page:", pageNum);
      setPage(pageNum);
    } else {
      setInputPage(page);
    }
  };

  const handleResetFilters = () => {
    console.log("Resetting filters");
    setCollection("");
    setCulture("");
    setMedium("");
    setSearchQuery("");
    setPage(1);
    setExhibits([]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        Exhibits
      </h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            console.log("Search query changed:", e.target.value);
            setSearchQuery(e.target.value);
          }}
          placeholder="Search exhibits..."
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full max-w-md"
        />
        <button
          onClick={() => {
            console.log("Search button clicked, resetting page to 1");
            setPage(1);
          }}
          className="px-4 py-2 ml-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      <button
        onClick={() => {
          console.log("Toggling filters. New state:", !filtersVisible);
          setFiltersVisible(!filtersVisible);
        }}
        className="flex items-center justify-center gap-2 bg-gray-900 text-gray-100 px-4 py-2 rounded-md w-full sm:w-auto mb-4"
      >
        {filtersVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        {filtersVisible ? "Hide Filters" : "Show Filters"}
      </button>

      {filtersVisible && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 transition-all duration-300">
          <select
            value={collection}
            onChange={(e) => {
              console.log("Collection changed:", e.target.value);
              setCollection(e.target.value);
            }}
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
            onChange={(e) => {
              console.log("Culture changed:", e.target.value);
              setCulture(e.target.value);
            }}
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
            onChange={(e) => {
              console.log("Medium changed:", e.target.value);
              setMedium(e.target.value);
            }}
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

      <div key={currentFetchId} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-full max-w-sm mx-auto"
                >
                  <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 animate-pulse mb-4"></div>
                  <div className="w-3/4 h-5 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
                  <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
                  <div className="w-full h-12 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
                </div>
              ))
          : exhibits.map(
              ({
                id,
                title,
                creator,
                imageUrl,
                description,
                collection,
                culture,
                date,
              }) => (
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
              )
            )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-8 items-center space-y-4 sm:space-y-0">
        <button
          onClick={() => handlePagination(page - 1)}
          disabled={page === 1}
          className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50"
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
          className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
