import { CircularProgress, Container, Typography } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { LoggedInNavBar } from '../../components/LoggedInNavBar';
import { auth, db, deleteAccount, logout } from '../../config/firebase';
import { Post } from '../../components/Post/Post';
import { MakePostModal } from './MakePostModal';

export function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ uid: null, username: null, profilePicture: null });
  const [userPosts, setUserPosts] = useState([]);

  // Handle's post creation modal
  const [open, setOpen] = React.useState(false);
    
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchUserData = async () => {
    try {
      const userQuery =  query(collection(db, 'users'), where('uid', '==', user?.uid));
      const postsQuery = query(collection(db, 'posts'), where('uid', '==', user?.uid));
      const postsSnapshot = await getDocs(postsQuery);
      const userSnapshot = await getDocs(userQuery);
      const data = userSnapshot.docs[0].data();

      setUserInfo({
        uid: data.uid,
        username: data.name,
        profilePicture: data.profilePicture,
      });

      // Note: QuerySnapshot isn't an iterable so that's why we have to
      // create a separate posts array and push the data.
      const posts = [];
      postsSnapshot.forEach((doc) => {
        posts.push(doc.data());
      });

      setUserPosts([...posts]);
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };

  useEffect(() => {
    if (!user) {
      return navigate('/log-in');
    }
    fetchUserData();
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
              height: '100%',
              maxWidth: {
                sm: '600px',
              },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: "4rem 0"
            }}
          >
            <MakePostModal uid={userInfo.uid} open={open} onClick={handleOpen} onClose={handleClose} />
            {userPosts?.map((post, index) => <Post 
              username={userInfo.username} 
              profilePicture={userInfo.profilePicture}
             {...post} key={index} />
                )}
          </Container>
        </>
      )}
    </>
  );
}
