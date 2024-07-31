import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './components/Question';
import Result from './components/Results';
import './App.css';

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10');
        setQuestions(response.data.results);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => ({ ...prevScore, correct: prevScore.correct + 1 }));
    } else {
      setScore((prevScore) => ({ ...prevScore, incorrect: prevScore.incorrect + 1 }));
    }
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="App">
      {!showResult ? (
        questions.length > 0 ? (
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        ) : (
          <p>Loading questions...</p>
        )
      ) : (
        <Result score={score} />
      )}
    </div>
  );
};

export default App;
