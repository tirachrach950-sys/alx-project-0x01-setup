import Header from "@/components/layout/Header";
import PostCard from "@/components/common/PostCard"; // ✅ Import exact requis
import { PostProps } from "@/interfaces";            // ✅ Import exact requis
import { useState } from "react";

interface PostsPageProps {
  posts: PostProps[];
}

const Posts: React.FC<PostsPageProps> = ({ posts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [allPosts, setAllPosts] = useState<PostProps[]>(posts);

  const handleAddPost = (newPost: PostProps) => {
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

      {/* Modal pour ajouter un post */}
      {isModalOpen && (
        <PostModal
          onClose={() => setModalOpen(false)}
          onSubmit={(post: PostProp
