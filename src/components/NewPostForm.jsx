import { useState } from 'react';
import classes from './NewPostForm.module.css';

function NewPostForm({ post, onCancel, onSubmit, submitting, onEdit }) {
  const [blog, setBlog] = useState(post);
  
  function onTitleChange(event) {
    setBlog({
      ...blog,
      title: event.target.value,
    });
  }

  function onBodyChange(event) {
    setBlog({
      ...blog,
      body: event.target.value,
    });
  }

  return (
    <form className={classes.form} onSubmit={!post ? onSubmit : (e) => onEdit(e, blog.id)}>
      <fieldset>
        <label htmlFor="title">Title</label>
        <input id="title"
          type="text"
          name="title"
          value={blog ? blog.title : ''}
          onChange={onTitleChange}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="text">Post Text</label>
        <textarea
          id="text"
          name="post-text"
          value={blog ? blog.body : ''}
          onChange={onBodyChange}
        >
        </textarea>
      </fieldset>
      <button type="button" onClick={onCancel} disabled={submitting}>
        Cancel
      </button>
      <button disabled={submitting}>
        {submitting ? 'Submitting...' : post ? 'Edit Post' :'Create Post'}
      </button>
    </form>
  );
}

export default NewPostForm;
