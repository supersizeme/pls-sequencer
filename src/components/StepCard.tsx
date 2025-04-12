import React from 'react';
import { Step } from '../types';

interface StepCardProps {
  step: Step;
  index: number;
  isDraggable: boolean;
  onDragStart?: (id: string, index: number) => void;
  isCorrect?: boolean | null;
}

const StepCard: React.FC<StepCardProps> = ({ 
  step, 
  index, 
  isDraggable, 
  onDragStart,
  isCorrect 
}) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isDraggable) {
      e.preventDefault();
      return;
    }
    
    e.dataTransfer.setData('text/plain', JSON.stringify({
      id: step.id,
      index
    }));
    
    if (onDragStart) {
      onDragStart(step.id, index);
    }
  };

  // Icônes de validation et d'erreur
  const renderStatusIcon = () => {
    if (isCorrect === null || isCorrect === undefined) return null;
    
    if (isCorrect) {
      return (
        <div className="absolute -right-3 -top-3 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center shadow-md border-2 border-white z-10 transform transition-transform duration-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="absolute -right-3 -top-3 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center shadow-md border-2 border-white z-10 transform transition-transform duration-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      );
    }
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={handleDragStart}
      className={`
        step-card-styled p-4 mb-2 rounded-lg shadow-md relative mt-2
        ${isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}
        ${isCorrect === true ? 'border-green-500 border-2' : ''}
        ${isCorrect === false ? 'border-red-500 border-2' : ''}
        transition-all duration-200
      `}
    >
      {renderStatusIcon()}
      <div className="flex items-center">
        <div className="w-14 h-14 flex-shrink-0 bg-red-cross rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-md">
          {index + 1}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-dark-gray text-lg">{step.content}</h3>
          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
