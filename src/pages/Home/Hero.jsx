/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { Box, Button, Container, Typography } from '@mui/material';

const bounceAnim = keyframes`
 from {
    transform: translate(0,  0px);
  }

  50% {
    transform: translate(0, -5px);
  }

  to {
    transform: translate(0, 0px);
  }
`;

function FullWidth({ children }) {
  return (
    <Box
      as="section"
      sx={{
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
}

export function Hero() {
  return (
    <FullWidth>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '2em',
          flexWrap: 'wrap',
          minHeight: '80vh',
          maxHeight: '1200px',
          background: 'rgb(173, 216, 230)',
          marginTop: '2em',
          borderRadius: '30px',
          borderTopRightRadius: '375px',
          borderBottomRightRadius: '125px',
        }}
      >
        <Box sx={{ position: 'relative ' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '80%',
              paddingLeft: '3em',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: '54px',
                fontFamily: 'Inter',
                fontWeight: 700,
                letterSpacing: '0.02px',
              }}
            >
              Sell your houses like hotcakes on the open market
            </Typography>
            <Typography
              sx={{
                fontSize: '1.25em',
                paddingTop: '1em',
                paddingBottom: '1.25em',
                fontFamily: 'Poppins',
                fontWeight: 400,
              }}
            >
              A place to share properties with like-minded folk
            </Typography>
            <Button variant="contained" size="medium" sx={{ alignSelf: 'flex-start' }}>
              Create an account
            </Button>
          </Box>
          <img
            css={css`
              width: 650px;
              max-width: 100%;
              animation: ${bounceAnim} 3.5s ease-in-out infinite;
              will-change: transform;
              position: absolute;
              top: 123px;
              left: 554px;
            `}
            alt="House"
            src="/images/house.png"
          />
        </Box>
      </Container>
    </FullWidth>
  );
}
