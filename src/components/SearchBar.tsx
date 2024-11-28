import { useRef } from "react";
interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, handleKeyDown }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="search for the user"
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default SearchBar;
