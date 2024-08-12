'use client';
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    // Here you would call your API to create a new user
    // For example, you might use Firebase or another auth service

    // Simulate successful sign-up
    console.log('User signed up:', { email, password });
    router.push('/signin');
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, color: 'white' }}>Sign Up</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2, backgroundColor: 'white' }}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 4, backgroundColor: 'white' }}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
    </Box>
  );
}
