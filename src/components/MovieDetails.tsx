import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();

  // Replace with your movie data fetching logic
  const movie = {
    id,
    title: "Example Movie",
    year: 2023,
    poster: "https://image.url",
    description: "Full movie description goes here...",
    rating: "8.5/10"
  };

  return (
    <div className="flex flex-col items-center text-white p-6">
      <img src={movie.poster} alt={movie.title} className="w-64 rounded-lg mb-4" />
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="mb-2">{movie.year}</p>
      <p className="mb-2">⭐ {movie.rating}</p>
      <p className="max-w-2xl text-center">{movie.description}</p>
    </div>
  );
};

export default MovieDetails;
