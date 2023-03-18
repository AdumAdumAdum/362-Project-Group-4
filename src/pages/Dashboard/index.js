import { CircularProgress, Container, Typography } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { LoggedInNavBar } from '../../components/LoggedInNavBar';
import { auth, db, deleteAccount, logout } from '../../config/firebase';

export function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const fetchUsername = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };

  useEffect(() => {
    if (!user) {
      return navigate('/log-in');
    }
    fetchUsername();
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
            }}
          >
            <Typography
              as="h1"
              sx={{
                fontSize: '3em',
                fontFamily: 'Inter',
                fontWeight: 700,
                paddingBottom: '1.25rem',
              }}
            >
              Hi {!!name ? name : 'there'}! (Signed in using the email: {user?.email})
            </Typography>
          </Container>
        </>
      )}
    </>
  );
}
