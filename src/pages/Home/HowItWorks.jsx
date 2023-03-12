/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Container, Typography } from '@mui/material';

const bounceAnim = keyframes`
 from {
    transform: translate(0,  0px);
  }

  50% {
    transform: translate(-5px, -5px);
  }

  to {
    transform: translate(0, 0px);
  }
`;

const coinAnim = keyframes`
 from {
    transform: translate(0,  0px);
  }

  50% {
    transform: translate(5px, 5px);
  }

  to {
    transform: translate(0, 0px);
  }
`;

function CustomTimelineItem({ children }) {
  return (
    <TimelineItem
      sx={{
        '&::before': {
          content: 'none',
        },
      }}
    >
      {children}
    </TimelineItem>
  );
}

export function HowItWorks() {
  return (
    <Container as="section" sx={{ display: 'flex ' }}>
      <Box
        sx={{
          position: 'relative',
          minWidth: '450px',
          height: '550px',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'lightcoral',
            position: 'absolute',
            zIndex: -1,
            width: '500px',
            height: '100%',
            left: '-20%',
            mixBlendMode: 'difference',
            borderRadius: '30px',
          }}
        />
        <img
          css={css`
            width: 650px;
            padding-bottom: 60px;
            animation: ${bounceAnim} 3.5s ease-in-out infinite;
            will-change: transform;
            position: absolute;
            top: 200px;
          `}
          alt="Piggy bank"
          src="/images/piggy-bank.png"
        />
        <img
          css={css`
            width: 225px;
            animation: ${coinAnim} 4.5s ease-in-out infinite;
            will-change: transform;
            transform: rotate(-45deg);
            position: absolute;
            top: 100px;
          `}
          alt="Piggy bank"
          src="/images/coins.png"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: '180px',
        }}
      >
        <Typography variant="h2" sx={{ fontSize: '3em', fontFamily: 'Inter', fontWeight: 700 }}>
          How It Works
        </Typography>
        <Typography sx={{ fontSize: '1.25em', marginTop: '24px' }}>
          With a vast network of realtors, all you have to do is share your property.
        </Typography>
        <Timeline
          sx={{
            paddingLeft: 0,
            paddingTop: '30px',
            '& > li': {
              flexGrow: 1,
            },
          }}
        >
          <CustomTimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography sx={{ fontSize: '1.25em', fontWeight: 500 }}>
                Step 1. Create an account
              </Typography>
              <Typography>Specify your location and other important information</Typography>
            </TimelineContent>
          </CustomTimelineItem>
          <CustomTimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography sx={{ fontSize: '1.25em', fontWeight: 500 }}>
                Step 2. Share your pictures
              </Typography>
              <Typography>Upload the properties for others to see</Typography>
            </TimelineContent>
          </CustomTimelineItem>
          <CustomTimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography sx={{ fontSize: '1.25em', fontWeight: 500 }}>
                Step 3. Add a description
              </Typography>
              <Typography>Tell them about what makes your property special</Typography>
            </TimelineContent>
          </CustomTimelineItem>
          <CustomTimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>
              <Typography sx={{ fontSize: '1.25em', fontWeight: 500 }}>Step 4. Profit!</Typography>
              <Typography>Mission Accomplished 🥳</Typography>
            </TimelineContent>
          </CustomTimelineItem>
        </Timeline>
      </Box>
    </Container>
  );
}
