import { Search } from "lucide-react";

interface SearchBarProps {
  query: string;
  setQuery: (s: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchBar({
  query,
  setQuery,
  handleSubmit,
}: SearchBarProps) {
  return (
    <div>
      <form
        className="rounded-full overflow-hidden flex mb-4 mx-auto relative"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="pl-12 py-2 bg-gray-800 w-full text-lg relative"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-red-500 px-4 py-2">Search</button>
        <Search className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
      </form>
    </div>
  );
}
