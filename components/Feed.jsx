import React from 'react';
import Post from './Post';
import '../styles/Feed.css';
// import '../styles/Posts.css';
// import Users from './Users';

import firstImage from '../src/image/1.png';
import secondImage from '../src/image/2.png';
import thirdImage from '../src/image/3.png';
// import {posts} from '../posts';

// const { id } = item;

const images = [
  firstImage,
  secondImage,
  thirdImage,
  firstImage,
  secondImage,
  thirdImage
];

const Feed = () => {
  return (
    <div className="posts">
      {images.map((item, index) => (
        <div key={index} className="posts-border">
          <Post image={item} id={index} key={index} />
        </div>
      ))}
    </div>
  );
};
export default Feed;
