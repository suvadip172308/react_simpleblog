import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";

import classes from './Posts.module.css';

function Posts({ blogPosts, handlePostDelete}) {
  return (
    <ul className={classes.posts}>
      {blogPosts.map((post) => (
        <li key={post.id}>
          <Link to={post.id.toString()}>
            <h2>{post.title}</h2>
          </Link>
          <span onClick={() => handlePostDelete(post.id)}>
            <FaRegTrashAlt/>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default Posts;
