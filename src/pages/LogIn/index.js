import GoogleIcon from '@mui/icons-material/Google';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { NavBar } from '../../components';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../config/firebase';

export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]);

  return (
    <>
      <NavBar />
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
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography
              as="h1"
              sx={{
                fontSize: '3em',
                fontFamily: 'Inter',
                fontWeight: 700,
                paddingBottom: '1.25rem',
              }}
            >
              Login
            </Typography>
            <Box
              component="form"
              display="grid"
              gap={2}
              sx={{
                gridTemplateAreas: `'email' 'password' 'login' 'google'`,
              }}
            >
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                variant="outlined"
                sx={{ gridArea: 'email' }}
                required
              />
              <TextField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                variant="outlined"
                sx={{ gridArea: 'password' }}
                required
              />

              <Button
                onClick={() => logInWithEmailAndPassword(email, password)}
                variant="contained"
                sx={{ gridArea: 'login' }}
              >
                Login
              </Button>
              <Button onClick={signInWithGoogle} variant="outlined" sx={{ gridArea: 'google' }}>
                <GoogleIcon sx={{ marginRight: '8px' }} />
                Log in with Google
              </Button>
            </Box>
            <Link
              to="/log-in"
              component={RouterLink}
              underline="always"
              sx={{ alignSelf: 'center', paddingTop: '2rem' }}
            >
              Need an account? Click here to create one.
            </Link>
          </>
        )}
      </Container>
    </>
  );
}
