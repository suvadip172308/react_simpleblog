import { useEffect, useState } from 'react';

import Posts from '../components/Posts';
import { getPosts, deletePost } from '../util/api';

function BlogPostsPage() {
  const [error, setError] = useState();
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }

    loadPosts();
  }, []);

  async function deleteHandler(id) {
    await deletePost(id);
    window.location.reload();
  }

  return (
    <>
      <h1>Our Blog Posts</h1>
      {isLoading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      {!error && posts && 
        <Posts
          blogPosts={posts}
          handlePostDelete={deleteHandler}
        />
      }
    </>
  );
}

export default BlogPostsPage;