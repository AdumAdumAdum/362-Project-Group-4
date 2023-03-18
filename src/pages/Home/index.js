import { Box } from '@mui/material';
import React from 'react';
import { NavBar } from '../../components/NavBar';
import { Community } from './Community';
import { Hero } from './Hero';
import { HowItWorks } from './HowItWorks';

export function Home() {
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
