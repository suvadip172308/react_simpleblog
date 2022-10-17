import classes from './BlogPost.module.css';
import { FaEdit } from "react-icons/fa";

function BlogPost({ post, openEditMode }) {
  return (
    <article className={classes.post}>
      <div>
        <h1>{post.title}</h1>
        <span onClick={() => openEditMode(post.id)}>
          <FaEdit/>
        </span>
      </div>
      <p>{post.body}</p>
    </article>
  );
}

export default BlogPost;
