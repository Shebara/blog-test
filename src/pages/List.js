import React from 'react';
import {useSelector} from 'react-redux';
import ListPosts from '../components/ListPosts';

const List = () => {
  const data = useSelector(state => state.data);

  return (
    <div className="List">
      <h1>POSTS</h1>
      <ListPosts data={data} />
    </div>
  );
}

export default List;