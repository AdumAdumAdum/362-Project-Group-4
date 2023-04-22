import { CircularProgress, Container, Typography } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { LoggedInNavBar } from '../../components/LoggedInNavBar';
import { auth, db, deleteAccount, logout } from '../../config/firebase';
import { Post } from '../../components/Post/Post';

export function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [userPosts, setUserPosts] = useState([]);

  const fetchUserData = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
      setUserPosts([...data.posts]);
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };

  useEffect(() => {
    if (!user) {
      return navigate('/log-in');
    }
    console.log(userPosts);
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
            name={!!name ? name : user?.email}
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
            {userPosts?.map((post, index) => <Post {...post} key={index} />
                )}
          </Container>
        </>
      )}
    </>
  );
}
