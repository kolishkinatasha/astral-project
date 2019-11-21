import React from 'react';
import { useState } from 'react';
import '../styles/Comment.css';
import { posts } from '../posts';
import Axios from 'axios';
import Post from './Post';

import deleteIcon from '../src/image/close.png';

const Comments = ({ closeComment, id }) => {
  const userComment = {
    author: '',
    comment: ''
  };

  const [data, setData] = useState(posts);
  // const [ comments, setComments ] = useState(data[id].comment);
  const [comments] = useState(data[id].comment);

  // Axios.get('/data')
  // .then (res => setData(res.data));
  const comment = e => {
    e.preventDefault();
    Axios.post('/comment', { param: { userComment, id } }).then(res => {
      //   res.data ? console.log('comment sent', userComment) : console.log('error');
      setData(res.data);
      console.log(res.data);
      console.log(data);
    });
    comments.push(userComment);
    //очистка полей
    document.getElementById('clearAuthor').value = null;
    document.getElementById('clearComment').value = null;
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
                // onClick={deleteComment}
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
