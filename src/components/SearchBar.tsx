import { forwardRef } from "react";
interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>((props, ref) => {
  const { searchTerm, setSearchTerm, handleKeyDown } = props;
  return (
    <>
      <input
        ref={ref}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="search for the user"
        onKeyDown={handleKeyDown}
      />
    </>
  );
});

export default SearchBar;
