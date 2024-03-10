import React, { useState, useEffect } from 'react';

function QuestionPaper() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'Name the largest river in the world??',
      options: ['Nile', 'Ganga', 'Krishna', 'Amazon river'],
      correctAnswer: 'Nile',
    },
    {
      id: 2,
      question: 'What is a group of crows called? ',
      options: ['murder', 'group', 'Bunch', 'crowd'],
      correctAnswer: 'murder',
    },
    {
      id: 3,
      question: 'Who was the last Viceroy of India??',
      options: ['Lord Chelmsford', ' Lord Mountbatten', 'Lord Hardinge I', 'Lord Hardinge II'],
      correctAnswer: 'Lord Mountbatten',
    },
    {
      id: 4,
      question: 'When was world war 1 started?',
      options: ['June 28, 1914,', 'June 21, 1914,', 'Jan 28, 1914,', 'July 28, 1914,'],
      correctAnswer: 'June 28, 1914,',
    },
    {
      id: 5,
      question: 'What is the Capital of India"?',
      options: ['Mumbai', 'Odissa', 'Karnataka', 'Delhi'],
      correctAnswer: 'Delhi',
    },
    // Add more questions as needed
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // Initial time in seconds (e.g., 10 minutes)
  const [score, setScore] = useState(null); // User's score

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file.type === 'application/pdf') {
      // Handle PDF upload
      console.log('PDF uploaded:', file);
    } else if (file.type === 'text/plain') {
      // Handle text file upload
      console.log('Text file uploaded:', file);
    } else {
      alert('Unsupported file format. Please upload a PDF or text file.');
    }
  };

  useEffect(() => {
    // Implement a timer decrementing timeRemaining
    const timer = setInterval(() => {
      if (timeRemaining > 0 && !submitted) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        clearInterval(timer);
        handleSubmission();
      }
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [timeRemaining, submitted]);

  const handleAnswerSelect = (selectedOption) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = selectedOption;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleNavigation = (step) => {
    const newIndex = currentQuestionIndex + step;
    if (newIndex >= 0 && newIndex < questions.length) {
      setCurrentQuestionIndex(newIndex);
    }
  };

  const handleSubmission = () => {
    setSubmitted(true);

    // Calculate the user's score
    let correctCount = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correctAnswer === selectedAnswers[i]) {
        correctCount++;
      }
    }

    const userScore = (correctCount / questions.length) * 100;
    setScore(userScore);
  };

  return (
    <div>
      {submitted ? (
        <div>
          <p>Your test has been submitted.</p>
          <h2>Your Score: {score.toFixed(2)}%</h2>
        </div>
      ) : (
        <>
          <h1>Question Paper</h1>
          <p>Time Remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</p>
          <form>
            <div style={{ border: '3.5px solid ', padding: '10px', marginBottom: '10px' }}>
              <p>{questions[currentQuestionIndex].question}</p>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={'question${questions[currentQuestionIndex].id}'}
                    value={option}
                    checked={selectedAnswers[currentQuestionIndex] === option}
                    onChange={() => handleAnswerSelect(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div>
              <button
                type="button"
                onClick={() => handleNavigation(-1)}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => handleNavigation(1)}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </button>
            </div>
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileUpload}
              style={{ marginTop: '10px' }}
            />
            <button
              type="button"
              onClick={handleSubmission}
              variant="outlined"
              style={{ backgroundColor: 'Red', color: 'Pink', marginTop: '10px' }}
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default QuestionPaper;
