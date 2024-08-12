'use client'
import { Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'

export default function Welcome() {
  const router = useRouter()

  const handleStart = () => {
    router.push('/page') // Corrected route to your main chatbot page
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: 'url("/cool-background.jpg")', // Replace with your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Typography
        variant="h2"
        align="center"
        sx={{ mb: 4, color: 'white', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}
      >
        Welcome to Headstarter AI
      </Typography>
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 4, color: 'white', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}
      >
        Your Personal AI Support Agent
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleStart}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: 'black',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
          ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          },
        }}
      >
        Get Started
      </Button>
    </Box>
  )
}
