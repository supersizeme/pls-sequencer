import React, { useState, useEffect } from 'react';

interface TutorialProps {
  onClose: () => void;
}

interface TutorialStep {
  title: string;
  content: string;
  image?: string;
  highlight: string | null;
}

const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const tutorialSteps: TutorialStep[] = [
    {
      title: "Bienvenue dans Le Séquenceur PLS !",
      content: "Ce jeu vous permet d'apprendre et de pratiquer les étapes de la Position Latérale de Sécurité (PLS).",
      image: undefined,
      highlight: null
    },
    {
      title: "Objectif du jeu",
      content: "Placez les étapes dans le bon ordre pour réaliser correctement la PLS. Vous avez 2 minutes pour compléter l'exercice.",
      image: undefined,
      highlight: ".timer-styled"
    },
    {
      title: "Étapes disponibles",
      content: "Voici les étapes que vous pouvez utiliser. Glissez-les depuis cette zone vers la timeline.",
      image: undefined,
      highlight: ".step-pool"
    },
    {
      title: "Timeline",
      content: "Déposez les étapes ici dans l'ordre correct. Vous pouvez réorganiser les étapes à tout moment.",
      image: undefined,
      highlight: ".timeline"
    },
    {
      title: "Validation",
      content: "Une fois les étapes placées, vous verrez des indicateurs verts (✓) pour les étapes correctement placées et rouges (✗) pour les étapes incorrectes.",
      image: undefined,
      highlight: ".step-card-styled"
    },
    {
      title: "C'est parti !",
      content: "Vous êtes prêt à commencer. Bonne chance !",
      image: undefined,
      highlight: null
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  // Effet de mise en évidence de l'élément ciblé
  useEffect(() => {
    const highlightSelector = tutorialSteps[currentStep].highlight;
    
    // Réinitialiser les styles précédents
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
      el.classList.remove('tutorial-highlight');
    });
    
    // Appliquer le nouvel effet de mise en évidence
    if (highlightSelector) {
      document.querySelectorAll(highlightSelector).forEach(el => {
        el.classList.add('tutorial-highlight');
      });
    }
    
    return () => {
      // Nettoyer les effets au démontage
      document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
      });
    };
  }, [currentStep, tutorialSteps]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative">
        {/* Indicateur de progression */}
        <div className="flex mb-4 justify-center">
          {tutorialSteps.map((_, index) => (
            <div 
              key={index} 
              className={`w-3 h-3 rounded-full mx-1 ${index === currentStep ? 'bg-red-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{tutorialSteps[currentStep].title}</h2>
        <p className="text-gray-700 mb-6">{tutorialSteps[currentStep].content}</p>
        
        {tutorialSteps[currentStep].image && (
          <div className="mb-6 flex justify-center">
            <img 
              src={tutorialSteps[currentStep].image} 
              alt={`Tutoriel étape ${currentStep + 1}`} 
              className="max-h-60 rounded-lg shadow-md"
            />
          </div>
        )}
        
        <div className="flex justify-between mt-8">
          <button 
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            Passer le tutoriel
          </button>
          
          <div>
            {currentStep > 0 && (
              <button 
                onClick={handlePrevious}
                className="mr-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Précédent
              </button>
            )}
            
            <button 
              onClick={handleNext}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-md"
            >
              {currentStep === tutorialSteps.length - 1 ? "Commencer" : "Suivant"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
