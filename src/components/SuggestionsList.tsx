import React from "react";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface SuggestionsListProps {
  suggestions: User[];
  checkSelectedUsers: Set<string>;
  handleUserSelection: (user: User) => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions, checkSelectedUsers, handleUserSelection }) => {
  return (
    <ul className="suggestions-list" style={suggestions.length < 1 ? { border: "none" } : {}}>
      {suggestions?.map((user) => {
        return !checkSelectedUsers.has(user.email) ? (
          <li key={user.email} onClick={() => handleUserSelection(user)}>
            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            <span>
              {user.firstName} {user.lastName}
            </span>
          </li>
        ) : (
          <></>
        );
      })}
    </ul>
  );
};

export default SuggestionsList;
