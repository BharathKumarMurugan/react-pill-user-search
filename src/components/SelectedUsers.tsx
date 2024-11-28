import Pill from "./Pill";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface SelectedUsersProps {
  selectedUsers: User[];
  handleUserDeletion: (user: User) => void;
}

const SelectedUsers: React.FC<SelectedUsersProps> = ({ selectedUsers, handleUserDeletion }) => {
  return (
    <>
      {selectedUsers.map((user) => {
        return (
          <Pill key={user.email} imgSrc={user.image} name={`${user.firstName} ${user.lastName}`} clickHandler={() => handleUserDeletion(user)} />
        );
      })}
    </>
  );
};

export default SelectedUsers;
