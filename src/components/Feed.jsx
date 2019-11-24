import React from 'react';
import Post from './Post';
import '../styles/Feed.css';

import firstImage from '../image/1.png';
import secondImage from '../image/2.png';
import thirdImage from '../image/3.png';

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
