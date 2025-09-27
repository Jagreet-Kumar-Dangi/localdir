import React, { useState } from "react";

interface MovieCardProps {
  title: string;
  year: number;
  rating?: number;
  genre: string;
  imageUrl: string;
  plot?: string; // ✅ added for extra details
  runtime?: string;
}

export function MovieCard({ title, year, rating, genre, imageUrl, plot, runtime }: MovieCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group relative cursor-pointer bg-gray-900 rounded-lg shadow-lg overflow-hidden"
      onClick={() => setExpanded(!expanded)} // ✅ toggle details
    >
      {/* Poster */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
            {genre}
          </span>
        </div>
      </div>

      {/* Title + Year */}
      <div className="p-3">
        <h3 className="text-white font-semibold group-hover:text-orange-500 transition-colors truncate">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
          <span>{year}</span>
          {rating && (
            <>
              <span className="text-gray-600">•</span>
              <span>⭐ {rating}/10</span>
            </>
          )}
        </div>
      </div>

      {/* ✅ Expandable Movie Details */}
      {expanded && (
        <div className="p-3 border-t border-gray-700 text-gray-300 text-sm space-y-2">
          {runtime && <p>⏱ {runtime}</p>}
          {plot ? <p>{plot}</p> : <p>No additional details available.</p>}
        </div>
      )}
    </div>
  );
}
