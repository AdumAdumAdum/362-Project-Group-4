import { Box } from '@mui/material';
import React from 'react';
import { Community } from './Community';
import { Hero } from './Hero';
import { HowItWorks } from './HowItWorks';

export function Home() {
  return (
    <>
      <Box as="main" display="grid" gap={'180px'}>
        <Hero />
        <HowItWorks />
        <Community />
      </Box>
    </>
  );
}
