import { useState } from "react";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    if (!query) return;

    const apiKey = "f4a963e6"; // Your OMDb API key
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h2>Search Movies</h2>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", width: "250px", marginRight: "10px" }}
      />
      <button onClick={searchMovies} style={{ padding: "8px 15px" }}>
        Search
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "20px", marginTop: "20px" }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ background: "#1c1c1c", padding: "10px", borderRadius: "8px" }}>
            <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/120x180"} alt={movie.Title} width="120" />
            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
