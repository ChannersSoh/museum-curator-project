import React from "react";

export default function Card({ title, creator, imageUrl, description }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600">By {creator}</p>
        <p className="text-gray-700 mt-2 text-sm">{description}</p>
      </div>
    </div>
  );
}
