import { useEffect, useState } from "react";
import fetchingImg from "./assets/data-fetching.png";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import { get } from "./util/http";
type RawDataBlogPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();

  useEffect(() => {
    async function fetchPost() {
      const data: RawDataBlogPost[] = (await get(
        "https://jsonplaceholder.typicode.com/posts"
      )) as RawDataBlogPost[];
      const blogPosts: BlogPost[] = data.map((rawPost) => ({
        id: rawPost.id,
        title: rawPost.title,
        text: rawPost.body,
      }));
      setFetchedPosts(blogPosts);
    }
    fetchPost();
    return () => {};
  }, []);
  return (
    <main>
      <img src={fetchingImg} />
      <BlogPosts posts={fetchedPosts ?? []}></BlogPosts>
    </main>
  );
}

export default App;
