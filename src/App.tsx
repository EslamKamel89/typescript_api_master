import { ReactNode, useEffect, useState } from "react";
import fetchingImg from "./assets/data-fetching.png";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import ErrorMessage from "./components/ErrorMessage";
import { get } from "./util/http";
type RawDataBlogPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError(undefined);
      try {
        const data: RawDataBlogPost[] = (await get(
          "https://jsonplaceholder.typicode.com/posts"
        )) as RawDataBlogPost[];
        const blogPosts: BlogPost[] = data.map((rawPost) => ({
          id: rawPost.id,
          title: rawPost.title,
          text: rawPost.body,
        }));
        setFetchedPosts(blogPosts);
      } catch (error) {
        setError((error as Error).message);
      }
      setLoading(false);
    }
    fetchPost();
    return () => {};
  }, []);
  let content: ReactNode;
  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts}></BlogPosts>;
  } else if (error) {
    content = <ErrorMessage text={error} />;
  } else if (loading) {
    content = <p id="loading-fallback">Loading data ...........</p>;
  }
  return (
    <main>
      <img src={fetchingImg} />
      {content}
    </main>
  );
}

export default App;
