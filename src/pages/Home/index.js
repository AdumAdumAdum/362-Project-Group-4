import { Box } from '@mui/material';
import React from 'react';
import { NavBar } from '../../components';
import { Community } from './Community';
import { Hero } from './Hero';
import { HowItWorks } from './HowItWorks';
import { logout } from '../../config/firebase';

export function Home() {
  logout();
  
  return (
    <>
      <NavBar />
      <Box as="main" display="grid" gap={'180px'}>
        <Hero />
        <HowItWorks />
        <Community />
      </Box>
    </>
  );
}
