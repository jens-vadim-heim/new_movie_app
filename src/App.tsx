import { Grid, Rows4 } from "lucide-react";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Favorites from "./components/Favorites";
import SearchMovieCard from "./components/SearchMovieCard";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modalActive, setModalActive] = useState(false);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [favoritesActive, setFavoritesActive] = useState(false);
  const [view, setView] = useState<"grid" | "rows">("grid");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Search field cannot be empty");
      return;
    }

    setLastSearch(query);
    setQuery("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/movies?query=${query}`);
      const json = await response.json();
      console.log(json);
      if (json.Response === "True") {
        setMovies(json.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error(error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const openMovieModal = (movie: Movie) => {
    setModalActive(true);
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setModalActive(false);
    setSelectedMovie(null);
  };

  const addToFavorites = (movie: Movie) => {
    const inFavorites = favorites.find((m) => m.imdbID === movie.imdbID);
    if (!inFavorites) {
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (toDelete: Movie) => {
    const updatedFavorites = favorites.filter(
      (movie) => movie.imdbID !== toDelete.imdbID
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isInFavorites = (movie: Movie) => {
    return favorites.some((m) => m.imdbID === movie.imdbID);
  };

  const changeViewTo = (newView: "grid" | "rows") => {
    setView(newView);
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Header
        favorites={favorites}
        openFavorites={() => setFavoritesActive(true)}
        closeFavorites={() => setFavoritesActive(false)}
      />

      <main className="flex-1 p-6 text-white flex flex-col gap-4 container mx-auto">
        {!favoritesActive && (
          <div>
            {/* Searchbar */}
            <SearchBar
              query={query}
              setQuery={setQuery}
              handleSubmit={handleSubmit}
            ></SearchBar>

            {isLoading && (
              <div className="text-center text-xl text-red-500">Loading...</div>
            )}

            {/* Results */}
            {lastSearch !== "" && (
              <div className="flex items-center mb-4">
                <p className="text-2xl font-bold mr-auto">
                  Results: {lastSearch}
                </p>
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
            )}

            {!isLoading && movies.length > 0 && (
              <div
                className={`text-white ${
                  view === "grid"
                    ? "grid grid-cols-3 sm:grid-cols-5 gap-4"
                    : "flex flex-col gap-4"
                }`}
              >
                {movies.map((movie) => {
                  const favorited = isInFavorites(movie);

                  return (
                    <SearchMovieCard
                      movie={movie}
                      view={view}
                      openMovieModal={openMovieModal}
                      addToFavorites={addToFavorites}
                      removeFromFavorites={removeFromFavorites}
                      favorited={favorited}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Favorites */}
        {favoritesActive && (
          <Favorites
            view={view}
            changeViewTo={changeViewTo}
            favorites={favorites}
            isInFavorites={isInFavorites}
            removeFromFavorites={removeFromFavorites}
            openMovieModal={openMovieModal}
          />
        )}
      </main>

      {/* Modal */}
      {selectedMovie !== null && modalActive && (
        <Modal
          closeModal={closeModal}
          selectedMovie={selectedMovie}
          isInFavorites={isInFavorites(selectedMovie)}
          addToFavorites={addToFavorites}
        />
      )}
    </div>
  );
}
