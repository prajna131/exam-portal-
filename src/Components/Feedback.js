import React, { useState } from 'react';

function Feedback() {
  const [feedbackQuestions, setFeedbackQuestions] = useState([
    {
      id: 1,
      question: 'How satisfied are you with the overall experience?',
      options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
      selectedAnswer: null,
    },
    {
      id: 2,
      question: 'Was the user interface easy to navigate?',
      options: ['Agree', 'Strongly Agree', 'Neutral', 'Disagree', 'Excellence'],
      selectedAnswer: null,
    },
    {
      id: 3,
      question: 'Did you find the content useful?',
      options: ['Yes', 'No'],
      selectedAnswer: null,
    },
    {
      id: 4,
      question: 'How likely are you to recommend this platform to others?',
      options: ['Very Likely', 'Likely', 'Neutral', 'Unlikely', 'Very Unlikely'],
      selectedAnswer: null,
    },
    {
      id: 5,
      question: 'Do you have any additional comments or suggestions?',
      options: [],
      selectedAnswer: '',
    },
  ]);

  const [submitted, setSubmitted] = useState(false);

  const handleAnswerSelect = (questionId, selectedOption) => {
    const updatedQuestions = feedbackQuestions.map((q) =>
      q.id === questionId ? { ...q, selectedAnswer: selectedOption } : q
    );
    setFeedbackQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    console.log(feedbackQuestions);
    setSubmitted(true);
  };

  return (
    <div>
      {submitted ? (
        <p>Your feedback has been submitted. Thank you!</p>
      ) : (
        <>
          <h1>Feedback Form</h1>
          <form>
            {feedbackQuestions.map((question) => (
              <div key={question.id} style={{ border: '3px solid ', padding: '10px', marginBottom: '20px' }}>
                <p>{question.question}</p>
                {question.options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name={'question$ {question.id}'}
                      value={option}
                      checked={question.selectedAnswer === option}
                      onChange={() => handleAnswerSelect(question.id, option)}
                    />
                    {option}
                  </label>
                ))}
                {question.id === 5 && (
                  <textarea
                    placeholder="Your comments or suggestions..."
                    value={question.selectedAnswer}
                    onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
                  />
                )}
              </div>
            ))}
            <button type="button" variant="outlined" style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleSubmit}>
              Submit Feedback
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Feedback;
