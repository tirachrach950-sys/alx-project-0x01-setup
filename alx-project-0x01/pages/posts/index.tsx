import Header from "@/components/layout/Header";
import PostCard from "@/components/common/PostCard";
import PostModal from "@/components/common/PostModal";
import { PostProps, PostData } from "@/interfaces"; // ✅ Import nécessaire
import { useState } from "react";

interface PostsPageProps {
  posts: PostProps[];
}

const Posts: React.FC<PostsPageProps> = ({ posts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [allPosts, setAllPosts] = useState<PostProps[]>(posts);

  const handleAddPost = (newPost: PostData) => {
    setAllPosts([...allPosts, { ...newPost, id: allPosts.length + 1 }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold">Post Content</h1>
          <button
            className="bg-blue-700 px-4 py-2 rounded-full text-white"
            onClick={() => setModalOpen(true)}
          >
            Add Post
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {allPosts.map((post, key) => (
            <PostCard key={key} {...post} />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <PostModal onClose={() => setModalOpen(false)} onSubmit={handleAddPost} />
      )}
    </div>
  );
};

// ✅ Fonction pour récupérer les posts depuis l'API
export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // ✅ URL requise
  const posts: PostProps[] = await response.json();

  return { props: { posts } };
}

export default Posts;
