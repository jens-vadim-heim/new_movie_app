import { Heart } from "lucide-react";
import type { Movie } from "../App";

interface HeaderProps {
  favorites: Movie[];
  openFavorites: () => void;
  closeFavorites: () => void;
}

export default function Header({
  favorites,
  openFavorites,
  closeFavorites,
}: HeaderProps) {
  return (
    <header className="bg-black/70 backdrop-blur-3xl  border-b border-gray-700 sticky top-0 z-40">
      <div className="container mx-auto text-red-600 text-3xl font-bold p-4 flex items-center justify-between">
        <h1
          className="font-extrabold hover:cursor-pointer"
          onClick={closeFavorites}
        >
          MovieTime
        </h1>
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={openFavorites}
        >
          <Heart className="inline" fill={"red"} />
          <span className="text-white text-lg ml-1">{favorites.length}</span>
        </div>
      </div>
    </header>
  );
}
