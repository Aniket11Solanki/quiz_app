import React, { useState } from 'react';
import '../Question.css';

interface QuestionProps {
  question: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    type: string;
  };
  onAnswer: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const isAnswerCorrect = selectedAnswer === question.correct_answer;
    setIsCorrect(isAnswerCorrect);
    onAnswer(isAnswerCorrect);
    setIsAnswered(true);
  };

  const answers = question.type === 'boolean'
    ? ['True', 'False']
    : [...question.incorrect_answers, question.correct_answer].sort();

  return (
    <div className="question-container">
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      <div className="answers">
        {answers.map((answer: string) => (
          <button
            key={answer}
            onClick={() => setSelectedAnswer(answer)}
            disabled={isAnswered}
            className={`answer-button ${selectedAnswer === answer ? 'selected' : ''}`}
            dangerouslySetInnerHTML={{ __html: answer }}
          ></button>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={isAnswered || !selectedAnswer} className="submit-button">
        Submit
      </button>
      {isAnswered && (
        <div className="result">
          {isCorrect ? 'Correct!' : `Wrong! The correct answer is ${question.correct_answer}`}
        </div>
      )}
      {isAnswered && (
        <button onClick={() => setIsAnswered(false)} className="next-button">Next</button>
      )}
    </div>
  );
};

export default Question;
