import React, { useState } from 'react';
import './App.css';
import { Post } from './components';

function App() {
  const [posts, setPosts] = useState([
    {
      username: 'Timechine Co.',
      caption: 'WILLIAM COSSACK JACKET – OLIVE',
      imageUrl:
        'https://www.timechineco.com/wp-content/uploads/2020/12/WilliamCossackJacket-Olive-1.jpg',
    },
    {
      username: 'Timechine Co.',
      caption: 'WILLIAM COSSACK JACKET – HONEY BROWN',
      imageUrl:
        'https://www.timechineco.com/wp-content/uploads/2020/12/WilliamCossackJacket-HoneyBrown-1.jpg',
    },
  ]);

  return (
    <div className="app">
      <header className="app__header">
        <span>Estators</span>
      </header>

      <h1>Timeline</h1>

      {posts.map((post, index) => (
        <Post
          key={index}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
