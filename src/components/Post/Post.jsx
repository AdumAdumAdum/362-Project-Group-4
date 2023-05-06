import { Avatar } from '@mui/material';
import React from 'react';
import './Post.css';

export function Post({ username, profilePicture, imageUrl, caption, description, likes }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={`{username}'s Profile Picture`}
          src={profilePicture}
        />
        <h3 className="post__username">{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt="" />

      <h4 className="post__text">
        {caption}
      </h4>
      <p>{description}</p>
      {!!likes && <span>Likes: {likes}</span>}
    </div>
  );
}
