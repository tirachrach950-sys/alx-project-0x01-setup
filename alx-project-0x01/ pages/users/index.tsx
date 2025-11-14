import Header from "@/components/layout/Header";
import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import { UserData } from "@/interfaces";
import { useState } from "react";

const Users: React.FC<{ posts: UserData[] }> = ({ posts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState<UserData[]>(posts);

  const handleAddUser = (newUser: UserData) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold">Users</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white"
          >
            Add User
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {users.map((user, key) => (
            <UserCard key={key} {...user} />
          ))}
        </div>
      </main>

      {isModalOpen && <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddUser} />}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const posts = await response.json();

  return {
    props: { posts },
  };
}

export default Users;

