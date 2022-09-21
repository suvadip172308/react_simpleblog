import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import BlogPost from '../components/BlogPost';
import NewPostForm from '../components/NewPostForm';
import { getPost, editPost } from '../util/api';

function PostDetailPage() {
  const [error, setError] = useState();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;

  async function loadPost(id) {
    setIsLoading(true);
    try {
      const post = await getPost(id);
      setPost(post);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadPost(id);
  }, [id]);

  function handleOpenEditMode(id) {
    setEditMode(true);
  }

  async function handleOnEdit(event, id) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(event.target);
      const post = {
        title: formData.get('title'),
        body: formData.get('post-text'),
      };
      
      await editPost(id, post);
      
      navigate('/blog');
    } catch (err) {
      setError(err);
    }
    setIsSubmitting(false);
  }

  return (
    <>
      {isLoading && <p>Loading post...</p>}
      {error && <p>{error.message}</p>}
      {!error && post && !isEditMode &&
        <BlogPost
          post={post}
          openEditMode={handleOpenEditMode}
        />
      }
      {!error && post && isEditMode &&
        <NewPostForm
          post={post}
          submitting={isSubmitting}
          onEdit={handleOnEdit}
        />
      }
    </>
  );
}

export default PostDetailPage;