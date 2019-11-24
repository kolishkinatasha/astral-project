import React, { useState } from 'react';
import Comments from './Comments';
import Axios from 'axios';

import '../styles/Post.css';
import { posts, users } from '../../posts';

const Post = ({ image, id }) => {
  const [commentIsOpen, setOpenComment] = useState(false);

  const [likeCounter, setLikeCounter] = useState(posts[id].likedUsers.length);

  // const [isLikeAdded, setLike] = useState(
  //   data.likedUsers.includes(localStorage.currentUser) ? true : false
  // );
  // localStorage.setItem('posts', JSON.stringify(posts));

  // console.log(JSON.parse(localStorage.getItem('posts')));
  const [data, resData] = useState(JSON.parse(localStorage.posts));
  // const [comments] = useState(data[id].comment);

  // const likeRequest = (id, user) =>
  //   Axios.post('/like', { params: { id, user } });

  const handleLike = () => {
    Axios.post(
      '/like',
      { params: { id, user } }.then(res => {
        console.log(res.data);
        localStorage.setItem('posts', JSON.stringify(res.data));
        setLikeCounter(res.data[data.id].likedUsers.length);
      })
    );
  };

  const handleComment = e => {
    e.preventDefault();
    setOpenComment(!commentIsOpen);
  };

  const closeComment = () => {
    setOpenComment(false);
  };
  // console.log(posts[id]);

  const [count, setCount] = useState(0);

  return (
    <div className="post">
      <img className="post-img" src={posts[id].src} alt="foto" />

      <div className="post-descr">{posts[id].descr}</div>
      <button
        className="post-button"
        data-counter="0"
        onClick={handleLike}
        // onClick={() => setCount(count + 1)}
      >
        <img
          className="post-button-img"
          src={require('../image/like.png')}
          alt="like"
        />
        {/* <img
          className="post-button-img__active"
          src={require('../src/image/activLike.png')}
          alt="like"
        /> */}
        <p className="post-button-img">{count}</p>
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
