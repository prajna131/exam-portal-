import React, { useState } from 'react';
import { Typography, Button, TextField, Paper, Grid } from '@mui/material';
import QuestionPaper from './Questionpaper';
import Feedback from './Feedback';
import Scheduling from './Scheduling';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showQuestionPaper, setShowQuestionPaper] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showScheduling, setShowScheduling] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (!username) {
      setErrorMessage('Please enter a username.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter a password.');
      return;
    }

    if (
      (username === '2200030406' || username === '2200030852' || username === '2200030861') &&
      (password === 'Veekshana@29' || password === 'Bhavana@25' || password === 'Prajna')
    ) {
      let message = 'Welcome, ';
      if (username === '2200030406') {
        message += 'Veekshana';
      } else if (username === '2200030852') {
        message += 'Bhavana';
      } else if (username === '2200030861') {
        message += 'prajna';
      }
      setLoggedIn(true);
      setWelcomeMessage(message);
      setErrorMessage('');
    } else {
      if (!(username === '2200030406' || username === '2200030852' || username === '2200030861')) {
        setErrorMessage('Invalid username.');
      } else {
        setErrorMessage('Invalid password.');
      }
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    setShowQuestionPaper(false);
    setShowFeedback(false);
    setShowScheduling(false);
    setWelcomeMessage('');
    setErrorMessage('');
  };

  const handleTakeExam = () => {
    setShowQuestionPaper(true);
    setShowFeedback(false);
    setShowScheduling(false);
  };

  const handleAnalysis = () => {
    setShowQuestionPaper(false);
    setShowScheduling(false);
    setShowFeedback(false);
  };

  const handleFeedback = () => {
    setShowQuestionPaper(false);
    setShowFeedback(true);
    setShowScheduling(false);
  };

  const handleScheduling = () => {
    setShowQuestionPaper(false);
    setShowFeedback(false);
    setShowScheduling(true);
  };

  return (
    <div className="home">
      <Typography
        variant="h3"
        style={{
          marginTop: '-20px',
          fontSize: '55px',
          fontFamily: 'Algerian',
          fontWeight: 'bold',
          color: 'black',
        }}
      >
        {loggedIn ? welcomeMessage : 'Online Exam Portal'}
      </Typography>

      {loggedIn ? (
        <div>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleTakeExam}
                style={{ backgroundColor: 'white', color: 'black' }}
              >
                Take Exam
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleScheduling}
                style={{ backgroundColor: 'white', color: 'black' }}
              >
                Exam Timings
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleFeedback}
                style={{ backgroundColor: 'white', color: 'black' }}
              >
                Feedback
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLogout}
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                }}
              >
                Log Out
              </Button>
            </Grid>
          </Grid>
          {showQuestionPaper && <QuestionPaper />}
          {showFeedback && <Feedback />}
          {showScheduling && <Scheduling />}
        </div>
      ) : (
        <div>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogin}
            style={{ backgroundColor: 'white', color: 'black' }}
          >
            Login
          </Button>
          {errorMessage && <Typography variant="caption" color="error">{errorMessage}</Typography>}
        </div>
      )}
    </div>
  );
}

export default Home;