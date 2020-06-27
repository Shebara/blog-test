import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Error from '../components/Error';
import Comments from '../components/Comments';
import { loadData, saveData } from '../store/localStorage';

const Post = ({match}) => {
  let data = useSelector(state => state.data);
  let comments = useSelector(state => state.comments);

  if (! match || ! match.params || ! match.params.id) {
      return (
        <Error title="Error: missing parameter" desc="Parameter 'id' is required!" />
      );
  }

  const id = match.params.id;

  if (isNaN(id)) {
    return (
      <Error title="Error: invalid parameter" desc="Parameter 'id' is not a number!" />
    );
  }

  if (data.length === 0) {
      data = loadData('data');
  }
  if (comments.length === 0) {
      comments = loadData('comments');
  } else {
      saveData('comments', comments);
  }

  if (data.length === 0) {
    return (
      <Redirect to='/' />
    );
  }

  data = data.find(item => item.id === id);
  comments = comments.filter(item => item.postId === id);

  if (! data) {
    return (
      <Error title="Error: nonexistent post" desc="The post with this ID does not exist!" />
    );
  }

  return (
    <div className="Post">
      <Link to='/'>&lt; Back to the list</Link>
      <h1>{data.title}</h1>
      <h3>{data.description}</h3>
      <p>{data.text}</p>
      <div className="created-at">{data.createdAt}</div>
      <Comments id={id} comments={comments} />
    </div>
  );
}

export default Post;