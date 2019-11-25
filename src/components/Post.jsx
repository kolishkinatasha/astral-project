import React, { useState } from 'react';
import Comments from './Comments';
import Axios from 'axios';

import '../styles/Post.css';
import { posts, users } from '../../posts';

const Post = ({ image, id }) => {
  const [commentIsOpen, setOpenComment] = useState(false);
  const [data, setData] = useState(JSON.parse(localStorage.posts));

  const [likeCounter, setLikeCounter] = useState(data[id].likedUsers.length);
  const [isLikeAdded, setLike] = useState(
    data[id].likedUsers.includes(localStorage.user ? true : false)
  );
  const handleLike = () => {
    setLike(!isLikeAdded);

    const { user } = localStorage;

    Axios.post('/like', { params: { user, id } }).then(res => {
      localStorage.setItem('posts', JSON.stringify(res.data));
      console.log(res.data[id].likedUsers.length);
      setLikeCounter(res.data[id].likedUsers.length);
    });
  };

  const handleComment = e => {
    e.preventDefault();
    setOpenComment(!commentIsOpen);
  };

  const closeComment = () => {
    setOpenComment(false);
  };

  return (
    <div className="post">
      <img className="post-img" src={posts[id].src} alt="foto" />

      <div className="post-descr">{posts[id].descr}</div>
      <button className="post-button" onClick={handleLike}>
        <img
          className="post-button-img"
          src={require('../image/like.png')}
          alt="like"
        />
        <p className="post-button-img">{likeCounter}</p>
      </button>
      <button className="post-button" onClick={handleComment}>
        <img
          className="post-button-img"
          src={require('../image/comment.png')}
          alt="comment"
        />
        <p className="post-button-img">
          {JSON.parse(localStorage.posts)[id].comment.length}
        </p>
      </button>
      {commentIsOpen && <Comments id={id} closeComment={closeComment} />}
    </div>
  );
};

export default Post;

//  export default class Post extends Component {

//     // const [commentIsOpen, setOpenComment] = useState(false);

//     // const handleComment = e => {
//     //   e.preventDefault();
//     //   setOpenComment(!commentIsOpen);
//     // };

//     // console.log('posts');
//     Service = new Service();
//     state = {
//         posts: [],
//         error: false,
//     }

//     componentDidMount(){
//         this.undatePosts();
//     }

//     undatePosts() {
//         this.Service.getAllPosts()
//         .then(this.onPostsLoaded)
//         .catch(this.onError);
//     }

//     onPostsLoaded = (posts) => {
//         this.setState({
//             posts,
//             error: false,
//         })
//         console.log(this.state.posts);
//     }

//     // onError = () => {
//     //     this.setState({
//     //         error: true,
//     //     })
//     // }

//     renderItems(arr) {
//         return arr.map(item => {
//             const { src, alt, id, descr} = item;

//             return(
//                 <div key={id}  className='post'>
//                 <img className='post-img' src={src} alt={alt} />

//                 <div className='post__descr'>
//                     {descr}
//                 </div>
//                 <button className='post__button'>
//                     <img className='post__button__like' src={require('../image/like.png')}  alt="like"/>
//                     <p className='post__button__like'>59</p>
//                 </button>
//                  <button className='post__button' >
//                     <img className='post__button__like' src={require('../image/comment.png')}  alt="comment"/>
//                     <p className='post__button__like'>4</p>
//                 </button>
//             </div>
//             )
//         });
//     }

//     render() {
//         const { posts } = this.state;

//         // if(error) {
//         //     return <ErrorMessege/>
//         // }

//         const items = this.renderItems(posts);  //здесь лежат все посты из метода renderItems, посты лежат в стейте
//         return(
//             <div className='posts'>
//             {items}
//             {/* { commentIsOpen && <Comments/> } */}
//             </div>
//         )
//     }
// }
