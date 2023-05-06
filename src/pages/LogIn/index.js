import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { NavBar } from '../../components';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../config/firebase';

export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          <CircularProgress sx={{alignSelf: 'center' }} />
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
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ gridArea: 'password' }}
                required
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
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
              to="/sign-up"
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
