import React, { useState, useEffect } from "react";
import Preloader from "./components/Preloader";

const API_KEY = "f4a963e6"; // Replace with your actual OMDb API key
const BASE_URL = "https://www.omdbapi.com/";

function App() {
  // --- STATE HOOKS ---
  const [movies, setMovies] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState("Action");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [movieDetails, setMovieDetails] = useState<Record<string, any>>({});

  // ✅ Preloader state
  const [preloading, setPreloading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPreloading(false), 2000); // show preloader for 2s
    return () => clearTimeout(timer);
  }, []);

  // --- FETCH MOVIES BY CATEGORY ---
  const fetchMovies = async (category: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${category}&type=movie`);
      const data = await res.json();
      setMovies(data.Search || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- FETCH SEARCH RESULTS ---
  const fetchSearchMovies = async (query: string) => {
    if (!query.trim()) return;
    try {
      setSearchLoading(true);
      const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&type=movie`);
      const data = await res.json();
      setSearchResults(data.Search || []);
    } catch (err) {
      console.error("Error fetching search results:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  // --- FETCH SINGLE MOVIE DETAILS ---
  const fetchMovieDetails = async (id: string) => {
    try {
      if (movieDetails[id]) {
        setSelectedMovieId(selectedMovieId === id ? null : id); // toggle open/close
        return;
      }
      const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
      const data = await res.json();
      setMovieDetails((prev) => ({ ...prev, [id]: data }));
      setSelectedMovieId(id);
    } catch (err) {
      console.error("Error fetching movie details:", err);
    }
  };

  // --- LOAD MOVIES INITIALLY ---
  useEffect(() => {
    fetchMovies(activeSection);
  }, [activeSection]);

  // ✅ Show Preloader before site loads
  if (preloading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-black via-[#1a0f00] to-orange-600">
      {/* Header */}
      <header className="p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">🎬 CineAura</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg w-80 bg-gray-800 text-white border border-gray-600"
          />
          <button
            onClick={() => fetchSearchMovies(searchQuery)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400"
          >
            Search
          </button>
        </div>
      </header>

      {/* Search Results */}
      {searchQuery && (
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">🔍 Search Results</h2>
          {searchLoading ? (
            <p className="text-center">Searching...</p>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {searchResults.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="bg-gray-900 rounded-xl shadow-lg overflow-hidden"
                >
                  <div
                    onClick={() => fetchMovieDetails(movie.imdbID)}
                    className="cursor-pointer hover:scale-105 transition-transform"
                  >
                    <img
                      src={
                        movie.Poster !== "N/A"
                          ? movie.Poster
                          : "https://via.placeholder.com/300x450?text=No+Image"
                      }
                      alt={movie.Title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold truncate">{movie.Title}</h2>
                      <p className="text-sm text-gray-400">{movie.Year}</p>
                    </div>
                  </div>

                  {/* Inline Movie Details */}
                  {selectedMovieId === movie.imdbID && movieDetails[movie.imdbID] && (
                    <div className="p-4 border-t border-gray-700">
                      <p className="text-gray-400 mb-2">
                        {movieDetails[movie.imdbID].Year} •{" "}
                        {movieDetails[movie.imdbID].Runtime} •{" "}
                        {movieDetails[movie.imdbID].Genre}
                      </p>
                      <p className="mb-2">
                        ⭐{" "}
                        <span className="font-semibold">
                          {movieDetails[movie.imdbID].imdbRating}
                        </span>
                        /10
                      </p>
                      <p className="text-sm text-gray-300">
                        {movieDetails[movie.imdbID].Plot}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No results found</p>
          )}
        </div>
      )}

      {/* Category Section */}
      <div className="flex justify-center gap-4 mb-6">
        {["Action", "Adventure", "Thriller"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveSection(cat);
              fetchMovies(cat);
            }}
            className={`px-4 py-2 rounded-lg ${
              activeSection === cat
                ? "bg-orange-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)} Movies
          </button>
        ))}
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 capitalize">{activeSection} Movies</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="bg-gray-900 rounded-xl shadow-lg overflow-hidden"
              >
                <div
                  onClick={() => fetchMovieDetails(movie.imdbID)}
                  className="cursor-pointer hover:scale-105 transition-transform"
                >
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.Title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold truncate">{movie.Title}</h2>
                    <p className="text-sm text-gray-400">{movie.Year}</p>
                  </div>
                </div>

                {/* Inline Movie Details */}
                {selectedMovieId === movie.imdbID && movieDetails[movie.imdbID] && (
                  <div className="p-4 border-t border-gray-700">
                    <p className="text-gray-400 mb-2">
                      {movieDetails[movie.imdbID].Year} •{" "}
                      {movieDetails[movie.imdbID].Runtime} •{" "}
                      {movieDetails[movie.imdbID].Genre}
                    </p>
                    <p className="mb-2">
                      ⭐{" "}
                      <span className="font-semibold">
                        {movieDetails[movie.imdbID].imdbRating}
                      </span>
                      /10
                    </p>
                    <p className="text-sm text-gray-300">
                      {movieDetails[movie.imdbID].Plot}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No movies found</p>
        )}
      </div>
    </div>
  );
}

export default App;
