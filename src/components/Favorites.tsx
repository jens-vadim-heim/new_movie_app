import { Grid, Rows4 } from "lucide-react";
import type { Movie } from "../App";
import FavoritesMovieCard from "./FavoritesMovieCard";

interface FavoritesProps {
  view: string;
  changeViewTo: (view: "grid" | "rows") => void;
  favorites: Movie[];
  isInFavorites: (movie: Movie) => boolean;
  removeFromFavorites: (movie: Movie) => void;
  openMovieModal: (movie: Movie) => void;
}

export default function Favorites({
  view,
  changeViewTo,
  favorites,
  isInFavorites,
  removeFromFavorites,
  openMovieModal,
}: FavoritesProps) {
  return (
    <div>
      <div className="flex items-center mb-4">
        <p className="text-2xl font-bold mr-auto">Favorites:</p>
        <Grid
          className={`${
            view === "grid" ? "text-red-500" : "text-red-900"
          } hover:cursor-pointer hover:bg-red-800/50`}
          onClick={() => changeViewTo("grid")}
        />
        <Rows4
          className={`${
            view === "rows" ? "text-red-500" : "text-red-900"
          } hover:cursor-pointer hover:bg-red-800/50 ml-2`}
          onClick={() => changeViewTo("rows")}
        />
      </div>
      <div
        className={`text-white ${
          view === "grid"
            ? "grid grid-cols-3 sm:grid-cols-5 gap-4"
            : "flex flex-col gap-4"
        }`}
      >
        {favorites.map((movie) => {
          return (
            <FavoritesMovieCard
              movie={movie}
              view={view}
              openMovieModal={openMovieModal}
              removeFromFavorites={removeFromFavorites}
              isInFavorites={isInFavorites}
            />
          );
        })}
      </div>
    </div>
  );
}
