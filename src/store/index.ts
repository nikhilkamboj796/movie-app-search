import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Movie } from "../App";

type Store = {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (imdbID: string) => void;
  isFavorite: (imdbID: string) => boolean;
};

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (movie) => {
        set((state) => ({
          favorites: [...state.favorites, movie],
        }));
      },

      removeFavorite: (imdbID) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.imdbID !== imdbID),
        }));
      },

      isFavorite: (imdbID) => {
        return get().favorites.some((fav) => fav.imdbID === imdbID);
      },
    }),
    {
      name: "favorites-storage",
    }
  )
);

export { useStore };
