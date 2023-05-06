import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { addPostToCollection } from '../../config/firebase';
import { Button, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'grid',
  gap: '1.2rem',
  maxWidth: '600px',
  width: '100%',
  padding: '2.4rem',
};


export function MakePostModal({ uid, open, onClick, onClose, updatePosts }) {
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [url, setURL] = useState('');

  const createPost = async () => {
    const newPost = await addPostToCollection(uid, url, caption, description);
    updatePosts(newPost);
  };

    // Caption, description, imageURL
    return (
        <Box sx={{ justifySelf: 'center' }}>
            <Button onClick={onClick} variant="contained">Create Post</Button>
            <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography
              as="h1"
              sx={{
                fontSize: '3em',
                fontFamily: 'Inter',
                fontWeight: 700,
                paddingBottom: '1.25rem',
                lineHeight: '0.8'
              }}
            >
              Make a Post
            </Typography>
            <TextField
                label="Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                id="caption"
                variant="outlined"
                required
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                variant="outlined"
              />
              <TextField
                label="Image URL"
                value={url}
                onChange={(e) => setURL(e.target.value)}
                id="url"
                variant="outlined"
                required
              />
              <Button onClick={createPost} variant="contained">Create Post</Button>
        </Box>
      </Modal>
        </Box>
    );
}