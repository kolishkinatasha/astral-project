// import { commentRequest, commentDeleter } from '../utils/index';

import React from 'react';
import { useState } from 'react';
import '../styles/Comment.css';
import { posts } from '../../posts';
import Axios from 'axios';
import Post from './Post';
import deleteIcon from '../image/close.png';

const Comments = ({ closeComment, id }) => {
  const userComment = {
    author: localStorage.getItem('user'),
    comment: ''
  };

  const [data, setData] = useState(JSON.parse(localStorage.posts));
  const [comments, setComments] = useState(data[id].comment);

  const deleteComment = commentId => () => {
    let arr = JSON.parse(localStorage.posts);
    console.log(commentId);
    arr[id].comment = arr[id].comment.filter(
      (item, index) => index !== commentId
    );
    console.log(arr);
    localStorage.posts = JSON.stringify(arr);

    Axios.post('/delete', arr).then(res => {
      localStorage.posts = JSON.stringify(res.data);
      setData(res.data);
    });
  };

  const comment = () => {
    Axios.post('/comment', { param: { userComment, id } }).then(res => {
      localStorage.posts = JSON.stringify(res.data);
      setData(JSON.parse(localStorage.posts));
      console.log(localStorage);
      console.log(data);
    });
    comments.push(userComment);

    document.getElementById('clearAuthor').value = '';
    document.getElementById('clearComment').value = '';
  };

  const handleComment = e => {
    const { name, value } = e.target;
    userComment[name] = value;
    console.log(name, value);
  };

  return (
    <div className="comment__background">
      <div className="comment">
        <Post id={id} />
        <div className="comment-form">
          {data[id].comment.map((item, index) => (
            <div key={index} index={index}>
              <span className="comment-user">{item.author}</span>
              <span className="comment-text">{item.comment}</span>
              <img
                src={deleteIcon}
                id={index}
                onClick={deleteComment(index)}
                className="comment-delete"
              />
            </div>
          ))}
          <div className="comment-form-input">
            <input
              className="comment-input"
              id="clearAuthor"
              name="author"
              onChange={handleComment}
              value={userComment.author}
              disabled
            />
            <span className="comment-input-placeholder">author</span>
            <input
              className="comment-input"
              id="clearComment"
              name="comment"
              onChange={handleComment}
            />
            <span className="comment-input-placeholder">comment</span>
          </div>

          <div className="comment-form__button">
            <button className="comment-button__blue" onClick={comment}>
              Отправить
            </button>
            <button className="comment-button__white" onClick={closeComment}>
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
