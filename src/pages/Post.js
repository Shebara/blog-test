import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Error from '../components/Error';

const Post = ({match}) => {
  let data = useSelector(state => state.data);

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
      data = localStorage.getItem('data');
      data = JSON.parse(data);
  }

  if (! data[id]) {
    return (
      <Error title="Error: nonexistent post" desc="The post with this ID does not exist!" />
    );
  } else {
    data = data[id];
  }

  return (
    <div className="Post">
      <Link to='/'>&lt; Back to the list</Link>
      <h1>{data.title}</h1>
      <h3>{data.description}</h3>
      <p>{data.text}</p>
      <div className="created-at">{data.createdAt}</div>
    </div>
  );
}

export default Post;