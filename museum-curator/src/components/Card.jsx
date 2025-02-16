import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, title, creator, imageUrl, description, collection, culture, date }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
      <Link to={`/exhibits/${id}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600">By {creator}</p>
          <p className="text-gray-700 mt-2 text-sm">{description}</p>
          <p className="text-gray-700 text-xs mt-1">{collection}</p>
          <p className="text-gray-700 text-xs mt-1">{culture}</p>
          <p className="text-gray-700 text-xs mt-1">{date}</p>
        </div>
      </Link>
    </div>
  );
}
