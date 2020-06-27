import React from 'react';

const PostComment = () => {
  return (
    <li className="NewComment">
      <form>
        <h3>New comment:</h3>
        <div><input placeholder="Your Name" /></div>
        <div><textarea placeholder="Your Comment" /></div>
        <div><button type="submit">Post</button></div>
      </form>
    </li>
  );
}

export default PostComment;