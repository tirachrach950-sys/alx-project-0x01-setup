import Header from "@/components/layout/Header";
import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import { UserProps, UserData } from "@/interfaces"; // ✅ Import nécessaire
import { useState } from "react";

interface UsersPageProps {
  users: UserProps[];
}

const Users: React.FC<UsersPageProps> = ({ users }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<UserProps[]>(users);

  const handleAddUser = (newUser: UserData) => {
    setAllUsers([...allUsers, { ...newUser, id: allUsers.length + 1 }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold">Users</h1>
          <button
            className="bg-green-600 px-4 py-2 rounded-full text-white"
            onClick={() => setModalOpen(true)}
          >
            Add User
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {allUsers.map((user, key) => (
            <UserCard key={key} {...user} />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddUser} />
      )}
    </div>
  );
};

// ✅ Récupération des utilisateurs depuis l'API
export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users"); // ✅ URL requise
  const users: UserProps[] = await response.json();

  return { props: { users } };
}

export default Users;
