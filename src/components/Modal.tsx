import { Heart } from "lucide-react";
import type { Movie } from "../App";

interface ModalProps {
  closeModal: () => void;
  selectedMovie: Movie;
  isInFavorites: boolean;
  addToFavorites: (m: Movie) => void;
}

export default function Modal({
  closeModal,
  selectedMovie,
  isInFavorites,
  addToFavorites,
}: ModalProps) {
  return (
    // Black background
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur flex justify-center items-center z-41"
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
    >
      {/* Content card */}
      <div
        className="bg-black text-white rounded-lg overflow-hidden w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="w-full"
          src={selectedMovie.Poster}
          alt={selectedMovie.Poster + " poster"}
        />
        <div className="px-4 py-2">
          <h2 className="text-2xl font-bold">{selectedMovie.Title}</h2>
          <div className="flex justify-between items-center">
            <p className="text-gray-300">{selectedMovie.Year}</p>
            <Heart
              className={`text-red-500 hover:cursor-pointer ${
                isInFavorites ? "fill-red-500" : "fill-none"
              }`}
              onClick={() => addToFavorites(selectedMovie)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
