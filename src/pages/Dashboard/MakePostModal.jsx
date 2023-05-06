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
};


export function MakePostModal({ uid, open, onClick, onClose }) {
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [url, setURL] = useState('');

  const createPost = () => {
    addPostToCollection(uid, url, caption, description);
  };

    // Caption, description, imageURL
    return (
        <div>
            <Button onClick={onClick}>Add a new post</Button>
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
        </div>
    );
}