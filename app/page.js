'use client';
import { useState } from 'react';
import { Box, Stack, TextField, IconButton, Typography, useTheme, Button, AppBar, Toolbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { CSSTransition } from 'react-transition-group'; // Import CSSTransition for animations

export default function Home() {
  const theme = useTheme();
  const [isWelcomePage, setIsWelcomePage] = useState(true); // State to manage welcome page visibility
  const [inProp, setInProp] = useState(true); // State to control transition
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi, this is Mohman, your ai Support Agent. How can I assist you today?',
    },
  ]);

  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message.trim() === '') return; // Prevent sending empty messages
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    reader.read().then(function processText({ done, value }) {
      if (done) {
        return result;
      }
      const text = decoder.decode(value || new Int8Array(), { stream: true });
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: lastMessage.content + text,
          },
        ];
      });
      return reader.read().then(processText);
    });
  };

  // Function to handle "Get Started" button click
  const handleStart = () => {
    setInProp(false); // Start the transition
    setTimeout(() => {
      setIsWelcomePage(false); // Hide welcome page and show chatbot after animation
      setInProp(true); // Reset transition state
    }, 500); // Match the transition duration
  };

  // Function to handle "Back" button click
  const handleBack = () => {
    setInProp(false); // Start the transition
    setTimeout(() => {
      setIsWelcomePage(true); // Show welcome page again after animation
      setInProp(true); // Reset transition state
    }, 500); // Match the transition duration
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
        background: 'linear-gradient(to bottom, #4E342E, #212121)', // Brownish to black gradient background
      }}
    >
      <CSSTransition
        in={inProp}
        timeout={500}
        classNames="slide"
        unmountOnExit
      >
        {isWelcomePage ? (
          // Welcome Page
          <>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"  // Align content to the left side
              sx={{
                backgroundImage: 'url("/cool-background.jpg")', // Replace with your welcome page background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
                paddingLeft: '10%',  // Add padding to move content to the left
              }}
            >
              <Typography
                variant="h2"
                align="left"
                sx={{ mb: 4, color: 'white', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}
              >
                Welcome to Mohman.ai
              </Typography>
              <Typography
                variant="h5"
                align="left"
                sx={{ mb: 2, color: 'white', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}
              >
                Your Personal AI Agent
              </Typography>
              {/* Add short hook */}
              <Typography
                variant="h6"
                align="left"
                sx={{ mb: 4, color: '#FFD700', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }} // Gold color for the hook
              >
                Empowering your journey with smart assistance.
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

            {/* Footer with GitHub and LinkedIn icons */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              mt={4} // margin-top for spacing from the content above
              sx={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}
            >
              <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                <IconButton
                  component="a"
                  href="https://github.com/kmohman" 
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    border: '2px solid white',
                    borderRadius: '50%',
                    padding: '8px',
                    marginRight: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Add a hover effect if desired
                    },
                  }}
                >
                  <GitHubIcon sx={{ color: 'white' }} />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/in/khalilullah-mohman-045161244/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    border: '2px solid white',
                    borderRadius: '50%',
                    padding: '8px',
                    marginLeft: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Add a hover effect if desired
                    },
                  }}
                >
                  <LinkedInIcon sx={{ color: 'white' }} />
                </IconButton>
              </Box>
              <Typography variant="body2" color="white" align="center">
                © 2024 Khalilullah Mohman
              </Typography>
            </Box>
          </>
        ) : (
          // Chatbot Page
          <>
            {/* Top App Bar with Back Button and "Mohman.ai" Title */}
            <AppBar position="static" color="transparent" elevation={0}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleBack}>
                  <ArrowBackIcon sx={{ color: 'white' }} />
                </IconButton>
                <Typography variant="h6" color="white" sx={{ flexGrow: 1 }}>
                  Mohman.ai
                </Typography>
              </Toolbar>
            </AppBar>

            <Stack
              direction="column"
              width="600px"
              height="650px"
              border="1px solid"
              borderColor="divider"
              p={2}
              spacing={3}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Black background with slight transparency
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Stack
                direction="column"
                spacing={2}
                flexGrow={1}
                overflow="auto"
                maxHeight="100%"
                sx={{ padding: 2 }}
              >
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent={
                      message.role === 'assistant' ? 'flex-start' : 'flex-end'
                    }
                  >
                    <Box
                      bgcolor={
                        message.role === 'assistant'
                          ? '#8D6E63'  // Brownish color for assistant messages
                          : '#FFAB91'  // Lighter brownish color for user messages
                      }
                      color="white"
                      borderRadius={16}
                      p={2}
                      sx={{ maxWidth: '70%' }}
                    >
                      {message.content}
                    </Box>
                  </Box>
                ))}
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Message support agent"
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  variant="outlined"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly opaque background for text field
                    color: 'black',
                  }}
                />
                <IconButton color="primary" onClick={sendMessage} sx={{ p: 0 }}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={40}
                    height={40}
                    bgcolor="primary.main"
                    borderRadius={2} // Changed to create a cube
                    color="white"
                  >
                    <SendIcon />
                  </Box>
                </IconButton>
              </Stack>
            </Stack>
          </>
        )}
      </CSSTransition>
    </Box>
  );
}