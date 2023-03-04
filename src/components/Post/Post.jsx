import { Avatar } from '@mui/material';
import React from 'react';
import './Post.css';

export function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Nijika Ijichi"
          src="https://cdn.discordapp.com/attachments/333819693850820608/1071479720337748099/dUkQAB6.jpg"
        />
        <h3 className="post__username">{username}</h3>
      </div>

      {/* Header -> avatar + username  */}

      <img className="post__image" src={imageUrl} alt="" />

      <h4 className="post__text">
        <strong>{username}: </strong>
        {caption}
      </h4>
    </div>
  );
}
