import { useEffect, useState } from "react";
import Loader from "./components/loader";
import MovieCard from "./components/movie/card";
import Pagination from "./components/pagination";
import { VITE_API_KEY } from "./config";
import { usePagination } from "./hooks/usePagination";
import { useSearchQuery } from "./hooks/useSearchQuery";
import Favorites from "./components/favorites";

export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

function App() {
  const [totalResults, setTotalResults] = useState(0);
  const { currentPage } = usePagination(totalResults);
  const { searchTerm, updateSearch } = useSearchQuery();
  const page = currentPage ?? 1;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${VITE_API_KEY}&s=${searchTerm}&page=${page}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) fetchMovies();
  }, [page]);

  return (
    <div className="h-screen w-screen grid content-start gap-6 p-4">
      {/* Search Input */}
      <div className="flex gap-3 w-fit max-w-xs mx-auto">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-900 mb-1"
          >
            Search movie
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => updateSearch(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-blue-600"
          />
        </div>
        <button
          type="button"
          className="rounded-sm bg-neutral-600 px-3 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-neutral-600/70 h-fit mt-auto cursor-pointer"
          onClick={fetchMovies}
        >
          Search
        </button>
      </div>
      <Favorites />
      {/* Loader */}
      {loading && <Loader />}

      {/* Movie Results */}
      {!loading && (
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid md:grid-cols-2 gap-4 max-h-[310px] overflow-y-auto">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  imdbID={movie.imdbID}
                  Poster={movie.Poster}
                  Title={movie.Title}
                  Year={movie.Year}
                  Type={movie.Type}
                />
              ))
            ) : (
              <p className="grid place-items-center col-span-2">
                Search for movies
              </p>
            )}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalResults > 10 && <Pagination totalResults={totalResults} />}
    </div>
  );
}

export default App;
