import React from 'react';
import '../Result.css';

interface ResultProps {
  score: {
    correct: number;
    incorrect: number;
  };
}

const Result: React.FC<ResultProps> = ({ score }) => {
  return (
    <div className="result-container">
      <h2>Results</h2>
      <p>Total Questions Served: 10</p>
      <p>Total Correct Questions: {score.correct}</p>
      <p>Total Incorrect Questions: {score.incorrect}</p>
    </div>
  );
};

export default Result;
