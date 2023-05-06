import GoogleIcon from '@mui/icons-material/Google';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { NavBar } from '../../components';
import { auth, registerWithEmailAndPassword, signInWithGoogle } from '../../config/firebase';

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const register = () => {
    registerWithEmailAndPassword(name, email, password);
  };

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
              Sign Up
            </Typography>
            <Box
              component="form"
              display="grid"
              gap={2}
              sx={{
                gridTemplateAreas: `'name email' 'password password' 'register register' 'google google'`,
              }}
            >
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                variant="outlined"
                sx={{ gridArea: 'name' }}
                required
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                variant="outlined"
                sx={{ gridArea: 'email' }}
                required
              />
              <FormControl sx={{ gridArea: 'password' }} variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              </FormControl>
              <Button onClick={register} variant="contained" sx={{ gridArea: 'register' }}>
                Register Account
              </Button>
              <Button onClick={signInWithGoogle} variant="outlined" sx={{ gridArea: 'google' }}>
                <GoogleIcon sx={{ marginRight: '8px' }} />
                Register with Google
              </Button>
            </Box>
            <Link
              to="/log-in"
              component={RouterLink}
              underline="always"
              sx={{ alignSelf: 'center', paddingTop: '2rem' }}
            >
              Already have an account? Click here to log in.
            </Link>
          </>
        )}
      </Container>
    </>
  );
}
