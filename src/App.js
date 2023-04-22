import React , {useState, useEffect}from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard, Home, LogIn, SignUp } from './pages';
import { Post } from './components';
import { db } from './config/firebase';


/*
 <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="log-in" element={<LogIn />} />
          <Route path="log-in" element={<LogIn />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<p>We can't find that page!</p>} />
        </Route>
      </Routes>*/

function App() {
  const [posts,setPosts] = useState([]);
  /// USe effect to add consitions 

  useEffect(() => {
    // This is where the code runs
    db.collection('posts').onSnapshot(snapshot => {
      // every time a new post is added, this code fires up
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
}, []);
  return (
  <div className= "app">
    <div className="app__header">
      <img
      className="app_headerImage"
      src = "public/estatelogo.png"
      />
    </div>
   
    {
      posts.map(posts =>(
        <Post username={posts.username} caption={posts.caption} imageUrl={posts.imageUrl}/>
      ))
    }
  </div>

  
  );
}

export default App;
