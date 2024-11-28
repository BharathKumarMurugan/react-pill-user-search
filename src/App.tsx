import { useEffect, useRef, useState } from "react";
import "./App.css";
import SelectedUsers from "./components/SelectedUsers";
import SuggestionsList from "./components/SuggestionsList";
import SearchBar from "./components/SearchBar";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface SuggestionsResponse {
  users: User[];
}

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [checkSelectedUsers, setCheckSelectedUsers] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }
    fetch(`https://dummyjson.com/users/search?q= ${searchTerm}`)
      .then((res) => res.json())
      .then((data: SuggestionsResponse) => setSuggestions(data.users))
      .catch((err) => console.error(err));
  }, [searchTerm]);

  const handleUserSelection = (user: User) => {
    setSelectedUsers((prev) => [...prev, user]);
    setCheckSelectedUsers((prev) => new Set([...prev, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current?.focus();
  };
  const handleUserDeletion = (user: User) => {
    setSelectedUsers((prev) => prev.filter((suser) => suser.id !== user.id));
    setCheckSelectedUsers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(user.email);
      return newSet;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && e.currentTarget.value === "" && selectedUsers.length > 0) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleUserDeletion(lastUser);
      setSuggestions([]);
    }
  };

  console.log(selectedUsers);

  return (
    <div className="container">
      <div className="user-search-input">
        <SelectedUsers selectedUsers={selectedUsers} handleUserDeletion={handleUserDeletion} />
        <div className="suggestions-cotnainer">
          <SearchBar ref={inputRef} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleKeyDown={handleKeyDown} />
          <SuggestionsList suggestions={suggestions} checkSelectedUsers={checkSelectedUsers} handleUserSelection={handleUserSelection} />
        </div>
      </div>
    </div>
  );
}

export default App;
