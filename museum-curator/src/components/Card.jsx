import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Card({ id, title, creator, imageUrl, description, collection, culture, date }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-700 shadow-md dark:shadow-lg rounded-lg overflow-hidden w-80 transition-transform transform hover:scale-105 hover:shadow-xl dark:hover:shadow-gray-900 duration-300">
      <Link to={`/exhibits/${id}`}>
        <div className="relative w-full h-48">
          {!isImageLoaded && <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>}
          <img
            src={imageUrl || "https://via.placeholder.com/300"}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>

        <div className="p-4">
          {!isLoaded ? (
            <div>
              <div className="w-3/4 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">By {creator || "Unknown"}</p>
              <p className="text-gray-700 dark:text-gray-400 mt-2 text-sm">
                {description || "No description available"}
              </p>
              <div className="text-gray-600 dark:text-gray-400 text-xs mt-3">
                <p><strong>Collection:</strong> {collection}</p>
                <p><strong>Culture:</strong> {culture}</p>
                <p><strong>Date:</strong> {date || "Unknown"}</p>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
