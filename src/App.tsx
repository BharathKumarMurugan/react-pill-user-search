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
    const filterUsers = () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }
      fetch(`https://dummyjson.com/users/search?q= ${searchTerm}`)
        .then((res) => res.json())
        .then((data: SuggestionsResponse) => setSuggestions(data.users))
        .catch((err) => console.error(err));
    };
    filterUsers();
  }, [searchTerm]);

  const handleUserSelection = (user: User) => {
    setSelectedUsers([...selectedUsers, user]);
    setCheckSelectedUsers(new Set([...checkSelectedUsers, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current?.focus();
  };
  const handleUserDeletion = (user: User) => {
    const updatedUsers = selectedUsers.filter((suser) => suser.id !== user.id);
    setSelectedUsers(updatedUsers);
    const updates = new Set(checkSelectedUsers);
    updates.delete(user.email);
    setCheckSelectedUsers(updates);
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
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleKeyDown={handleKeyDown} />
          <SuggestionsList suggestions={suggestions} checkSelectedUsers={checkSelectedUsers} handleUserSelection={handleUserSelection} />
        </div>
      </div>
    </div>
  );
}

export default App;
