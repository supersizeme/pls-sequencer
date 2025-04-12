import React from 'react';
import StepCard from './StepCard';
import { Step } from '../types';

interface TimelineProps {
  steps: Step[];
  userOrder: string[];
  correctOrder: string[];
  onDragStart: (id: string, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ 
  steps, 
  userOrder,
  correctOrder,
  onDragStart, 
  onDragOver, 
  onDrop 
}) => {
  // Récupérer les étapes dans l'ordre de l'utilisateur
  const orderedSteps = userOrder.map(id => steps.find(step => step.id === id)!);

  // Vérifier si une étape est à la bonne position
  const isStepCorrect = (stepId: string, index: number): boolean => {
    return correctOrder[index] === stepId;
  };

  return (
    <div 
      className="bg-white p-5 rounded-lg shadow-md border-2 border-red-cross h-full flex flex-col"
      data-droppable-id="timeline"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, orderedSteps.length)}
    >
      <h2 className="text-xl font-bold text-dark-gray mb-4 border-b-2 border-red-cross pb-2 title-styled">
        Séquence PLS
      </h2>
      <div
        className="flex-grow relative timeline-styled overflow-y-auto"
        data-droppable-id="timeline"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, orderedSteps.length)}
      >
        {/* Ligne de temps verticale */}
        <div className="timeline-line h-full"></div>
        
        {orderedSteps.length === 0 ? (
          <div 
            className="text-center p-8 text-gray-500 italic min-h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300 h-full"
            data-droppable-id="timeline"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Faites glisser les étapes ici dans le bon ordre
          </div>
        ) : (
          <div className="pb-20">
            {orderedSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`relative pl-8 mb-6 ${isStepCorrect(step.id, index) ? 'correct-placement' : ''}`}
                data-droppable-id="timeline"
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, index)}
              >
                {/* Cercle sur la timeline */}
                <div className="timeline-dot" style={{ top: '24px' }}></div>
                <StepCard 
                  step={step} 
                  index={index} 
                  isDraggable={true}
                  onDragStart={(id, idx) => onDragStart(id, idx)}
                  isCorrect={isStepCorrect(step.id, index)}
                />
              </div>
            ))}
          </div>
        )}
        
        {/* Zone de drop supplémentaire en bas de la timeline pour s'assurer que l'espace vide est droppable */}
        {orderedSteps.length > 0 && (
          <div 
            className="min-h-[150px] mt-4 border-t border-dashed border-gray-200 pt-4 sticky bottom-0 bg-white"
            data-droppable-id="timeline"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, orderedSteps.length)}
          >
            <div className="text-center text-sm text-gray-400 italic">
              Déposez ici pour ajouter à la fin
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
