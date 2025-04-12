import React from 'react';
import StepCard from './StepCard';
import { Step } from '../types';

interface StepPoolProps {
  steps: Step[];
  userOrder: string[];
  onDragStart: (id: string, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
}

const StepPool: React.FC<StepPoolProps> = ({ 
  steps, 
  userOrder, 
  onDragStart, 
  onDragOver, 
  onDrop 
}) => {
  // Filtrer les étapes qui ne sont pas encore dans l'ordre de l'utilisateur
  const availableSteps = steps.filter(step => !userOrder.includes(step.id));

  return (
    <div 
      className="bg-white p-5 rounded-lg mb-8 shadow-md"
      data-droppable-id="step-pool"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, availableSteps.length)}
    >
      <h2 className="text-xl font-bold text-dark-gray mb-4 border-b-2 border-red-cross pb-2 title-styled">
        Étapes à placer
      </h2>
      <div 
        className="min-h-[200px] relative"
        data-droppable-id="step-pool"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, availableSteps.length)}
      >
        {availableSteps.length === 0 ? (
          <div 
            className="text-center p-6 text-gray-500 italic min-h-[100px] flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300"
            data-droppable-id="step-pool"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Toutes les étapes ont été placées
          </div>
        ) : (
          availableSteps.map((step, index) => (
            <div 
              key={step.id}
              className="step-card-container mb-3"
              data-droppable-id="step-pool"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, index)}
            >
              <StepCard 
                key={step.id} 
                step={step} 
                index={index} 
                isDraggable={true}
                onDragStart={(id, idx) => onDragStart(id, idx)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StepPool;
