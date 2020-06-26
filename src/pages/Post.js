import React from 'react';

const Post = ({match}) => {
  if (! match || ! match.params || ! match.params.id) {
      return (
        <div className="Error">
          <h1>Error: missing parameter</h1>
          <div>Parameter 'id' is required!</div>
        </div>
      );
  }
  if (isNaN(match.params.id)) {
    return (
      <div className="Error">
        <h1>Error: invalid parameter</h1>
        <div>Parameter 'id' is invalid!</div>
      </div>
    );
  }

  return (
    <div className="Post">
      <h1>POST</h1>
    </div>
  );
}

export default Post;