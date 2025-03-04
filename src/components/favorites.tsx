import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/movie/card";

const Favorites = () => {
  const { favorites } = useFavorites();
  const favoriteMovies = Object.values(favorites);

  return (
    <div className="max-w-4xl mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      {favoriteMovies.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4 max-h-[310px] overflow-y-auto">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.imdbID} {...movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No favorites added yet.</p>
      )}
    </div>
  );
};

export default Favorites;
