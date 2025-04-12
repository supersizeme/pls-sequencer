import React, { useState, useEffect } from 'react';

interface FeedbackProps {
  feedback: string;
  score: number;
  isComplete: boolean;
  onReset: () => void;
  timeLeft: number;
  onTimeUp: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ 
  feedback, 
  score, 
  isComplete, 
  onReset,
  timeLeft,
  onTimeUp
}) => {
  // Formater le temps restant en minutes:secondes
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Déterminer la classe de couleur pour le chronomètre
  const getTimeClass = (): string => {
    if (timeLeft <= 10) return 'text-red-600 font-bold';
    if (timeLeft <= 30) return 'text-orange-500';
    return 'text-gray-700';
  };

  return (
    <div className={`
      feedback-panel p-4 rounded-lg mb-6 transition-all duration-300
      ${isComplete ? 'bg-green-50 border-green-500' : 'bg-white'}
    `}>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-dark-gray mb-2">Feedback</h2>
          <p className={`${isComplete ? 'text-green-700' : 'text-gray-700'}`}>
            {feedback || "Placez les étapes dans le bon ordre"}
          </p>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className={`timer-styled mb-2 ${getTimeClass()}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatTime(timeLeft)}
          </div>
          <div className="text-2xl font-bold text-red-cross mb-2">Score: {score}</div>
          {isComplete && (
            <button 
              onClick={onReset}
              className="button-styled"
            >
              Recommencer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
