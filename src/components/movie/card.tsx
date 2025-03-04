import { useFavorites } from "../../hooks/useFavorites";

const MovieCard = ({
  imdbID,
  Poster,
  Title,
  Year,
  Type,
}: {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
  Type: string;
}) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.findIndex((item) => item.imdbID === imdbID) >= 0;
  return (
    <div className="flex gap-4 p-3 border border-gray-200 rounded-lg shadow-sm ">
      <img
        src={Poster}
        alt={Title}
        className="w-16 h-24 object-cover rounded-md"
      />
      <div>
        <h3 className="text-lg font-semibold">{Title}</h3>
        <p className="text-gray-600">Year: {Year}</p>
        <p className="text-gray-600 capitalize">Type: {Type}</p>
        <button
          onClick={() => toggleFavorite({ Poster, Title, Year, Type, imdbID })}
          className={`mt-2 px-3 py-1 text-xs font-semibold border rounded-md ${
            isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {isFavorite ? "Remove Favorite" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
