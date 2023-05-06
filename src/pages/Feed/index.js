import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { LoggedInNavBar } from '../../components/LoggedInNavBar';
import { auth, db, deleteAccount, logout } from '../../config/firebase';
import { Post } from '../../components/Post/Post';
import { query, orderBy, limit, getDocs, collection, where } from "firebase/firestore";  
import { CircularProgress, Container, Typography, Box } from '@mui/material';


export function Feed() {
    const [user, loading, error] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState({ uid: null, username: null, profilePicture: null });
    const navigate = useNavigate();
    const [userPosts, setUserPosts] = useState([]);

    const fetchPosts = async () => {
        const userQuery =  query(collection(db, 'users'), where('uid', '==', user?.uid));
        const userSnapshot = await getDocs(userQuery);
        const data = userSnapshot.docs[0].data();

        setUserInfo({
            uid: data.uid,
            username: data.name,
            profilePicture: data.profilePicture,
          });

        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("dateCreated", "desc"), limit(50));

        const postsSnapshot = await getDocs(q);

        const posts = [];
        postsSnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        setUserPosts([...posts]);
    };

    useEffect(() => {
        if (!user) {
          return navigate('/log-in');
        }
        fetchPosts();
      }, [user]);

    return (
        <>
      {loading ? (
        <Container
          sx={{
            height: '100%',
            maxWidth: {
              sm: '600px',
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Container>
      ) : (
        <>
          <LoggedInNavBar
            onClick={logout}
            onDelete={deleteAccount}
            username={userInfo.username}
            profilePicture={userInfo.profilePicture}
          />
          <Container
            sx={{
              height: 'auto%',
              maxWidth: {
                sm: '600px',
              },
              display: "grid",
              padding: "150px 0",
              gridGap: "5rem",
              gridTemplateColumns: 'repeat(auto-fill, 500px)',
              placContent: 'center'
            }}
          >
            {userPosts?.map((post, index) => <Post 
              username={"Default"} 
              profilePicture={"https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"}
             {...post} key={index} />
                )}
          </Container>
        </>
        )}
      </>
    );
}