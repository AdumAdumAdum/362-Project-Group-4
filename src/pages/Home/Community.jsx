/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CircularProgress, Container, Typography, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { query, orderBy, limit, getDocs, collection, where } from "firebase/firestore";
import { db } from '../../config/firebase';

export function Community() {
  const [userPosts, setUserPosts] = useState([]);

  const grabLatestPosts = async () => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("dateCreated", "desc"), limit(9));

        const postsSnapshot = await getDocs(q);

        const posts = [];
        postsSnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        setUserPosts([...posts]);
  };

  useEffect(() => {
    grabLatestPosts();
  }, []);

  return (
    <Container
      as="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '600px' }}
    >
      <Typography as="h2" sx={{ fontSize: '3em', fontFamily: 'Inter', fontWeight: 700 }}>
        Discover Our Community
      </Typography>
      <Box sx={{ display: 'flex', maxWidth: '600px', width: '100%', justifyContent: 'center', paddingTop: '2rem'}} >
      {userPosts.length < 0 ? <CircularProgress /> : userPosts.map((post) => <img src={post.imageUrl} 
      css={css`
        width: 400px;
        height: auto;
      `} 
      />)}
      </Box>
    </Container>
  );
}
