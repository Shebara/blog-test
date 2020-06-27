import React from 'react';
import {useSelector} from 'react-redux';
import ListPosts from '../components/ListPosts';
import { loadData } from '../store/localStorage';

const List = () => {
  const data = useSelector(state => state.data);
  let comments = useSelector(state => state.comments);

  if (comments.length === 0) {
      comments = loadData('comments');
  }

  return (
    <div className="List">
      <h1>Posts:</h1>
      <ListPosts data={data} comments={comments} />
    </div>
  );
}

export default List;