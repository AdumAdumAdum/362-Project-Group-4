import { Container, Typography } from '@mui/material';
import React from 'react';

export function Community() {
  return (
    <Container
      as="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '600px' }}
    >
      <Typography as="h2" sx={{ fontSize: '3em', fontFamily: 'Inter', fontWeight: 700 }}>
        Discover Our Community
      </Typography>
      <Typography>We have none Sadge</Typography>
    </Container>
  );
}
