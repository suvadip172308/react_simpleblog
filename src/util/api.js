export async function getPosts() {
  const response = await fetch('http://localhost:3000/posts');
  if (!response.ok) {
    throw { message: 'Failed to fetch posts.', status: 500 };
  }
  return response.json();
}

export async function getPost(id) {
  const response = await fetch(
    'http://localhost:3000/posts/' + id
  );
  if (!response.ok) {
    throw { message: 'Failed to fetch post.', status: 500 };
  }
  return response.json();
}

export async function savePost(post) {
  if (post.title.trim().length < 5 || post.body.trim().length < 10) {
    throw { message: 'Invalid input data provided.', status: 422 };
  }

  const response = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw { message: 'Could not save post.', status: 500 };
  }
}

export async function deletePost(id) {
  if (!id) {
    throw { message: 'Invalid input data provided.', status: 422 };
  }

  const response = await fetch('http://localhost:3000/posts/'  + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw { message: 'Could not be deleted.', status: 500 };
  }
}

export async function editPost(id, post) {
  if (!id) {
    throw { message: 'Id not provided.', status: 422 };
  } else if (post.title.trim().length < 5 || post.body.trim().length < 10) {
    throw { message: 'Invalid input data provided.', status: 422 };
  }

  const response = await fetch('http://localhost:3000/posts/'  + id, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw { message: 'Could not be deleted.', status: 500 };
  }
}
