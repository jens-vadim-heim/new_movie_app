import { Heart } from "lucide-react";
import type { Movie } from "../App";

interface FavoritesMovieCardProps {
  movie: Movie;
  openMovieModal: (m: Movie) => void;
  view: string;
  removeFromFavorites: (m: Movie) => void;
  isInFavorites: (m: Movie) => boolean;
}

export default function FavoritesMovieCard({
  movie,
  openMovieModal,
  view,
  removeFromFavorites,
  isInFavorites,
}: FavoritesMovieCardProps) {
  const favorited = isInFavorites(movie);

  if (view === "grid") {
    return (
      <div
        key={movie.imdbID}
        className="flex flex-col rounded-xl overflow-hidden"
        onClick={() => openMovieModal(movie)}
      >
        <img src={movie.Poster} alt={movie.Title + " poster"} />
        <div className="p-2 flex flex-col">
          <p className="font-bold">{movie.Title}</p>
          <div className="flex justify-between">
            <span className="text-gray-400">{movie.Year}</span>
            <span onClick={() => removeFromFavorites}>
              <Heart
                className={`text-red-500 hover:cursor-pointer ${
                  favorited ? "fill-red-500" : "fill-none"
                }`}
                onClick={(e) => {
                  e.stopPropagation(), removeFromFavorites(movie);
                }}
              />
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="flex gap-2 rounded-xl overflow-hidden"
        onClick={() => openMovieModal(movie)}
      >
        <img
          src={movie.Poster}
          alt={movie.Title + " poster"}
          className="w-[150px]"
        />
        {/* Text info */}
        <div className="flex-1 flex flex-col gap-3 p-4 text-right">
          <h2 className="font-bold text-lg">{movie.Title}</h2>
          <p className="text-gray-400">{movie.Year}</p>
          <span className="ml-auto mt-auto">
            <Heart
              className={`text-red-500 hover:cursor-pointer ${
                favorited ? "fill-red-500" : "fill-none"
              }`}
              onClick={(e) => {
                e.stopPropagation(), removeFromFavorites(movie);
              }}
            />
          </span>
        </div>
      </div>
    );
  }
}
