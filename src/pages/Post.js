import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Error from '../components/Error';
import Comments from '../components/Comments';
import { loadData } from '../store/localStorage';

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
      data = loadData('data');
  }

  data = data.find(item => item.id === id);

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
      <Comments id={id} />
    </div>
  );
}

export default Post;