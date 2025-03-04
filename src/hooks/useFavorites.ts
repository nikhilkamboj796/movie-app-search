import { Movie } from "../App";
import { useStore } from "../store";

export const useFavorites = () => {
  const favorites = useStore((state) => state.favorites);
  const addFavorite = useStore((state) => state.addFavorite);
  const removeFavorite = useStore((state) => state.removeFavorite);
  const isFavorite = useStore((state) => state.isFavorite);

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return {
    favorites,
    toggleFavorite,
  };
};
