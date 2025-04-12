import React, { useState, useEffect, useRef } from 'react';
import StepPool from './StepPool';
import Timeline from './Timeline';
import Feedback from './Feedback';
import { stepsData, correctOrderIds } from '../data/stepsData';
import { GameState } from '../types';
import Tutorial from './Tutorial';
import '../styles/theme.css';

interface DragData {
  id: string;
  index: number;
}

// Constante pour le temps initial (2 minutes en secondes)
const INITIAL_TIME = 120;

const PLSGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    steps: [],
    correctOrder: [],
    userOrder: [],
    currentStep: 0,
    score: 0,
    isComplete: false,
    feedback: 'Placez les étapes dans le bon ordre',
    startTime: null,
    endTime: null
  });
  const [dragSource, setDragSource] = useState<{ droppableId: string; index: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  // Initialiser le jeu
  useEffect(() => {
    initGame();
    
    // Nettoyer le timer lors du démontage du composant
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const initGame = () => {
    // Arrêter le timer existant s'il y en a un
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Mélanger les étapes
    const shuffledSteps = [...stepsData].sort(() => Math.random() - 0.5);
    
    setGameState({
      steps: shuffledSteps,
      correctOrder: correctOrderIds,
      userOrder: [],
      currentStep: 0,
      score: 0,
      isComplete: false,
      feedback: 'Placez les étapes dans le bon ordre',
      startTime: Date.now(),
      endTime: null
    });
    
    // Réinitialiser le chronomètre
    setTimeLeft(INITIAL_TIME);
    
    // Démarrer le chronomètre
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          // Temps écoulé, arrêter le timer
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          handleTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Vérifier si c'est le premier lancement en utilisant localStorage
    const hasSeenTutorial = localStorage.getItem('pls_tutorial_seen');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  };

  // Gérer la fin du temps
  const handleTimeUp = () => {
    if (!gameState.isComplete) {
      setGameState(prevState => ({
        ...prevState,
        feedback: 'Temps écoulé ! Essayez à nouveau.',
        endTime: Date.now()
      }));
    }
  };

  const handleDragStart = (id: string, index: number) => {
    // Si le jeu est terminé ou le temps est écoulé, ne pas permettre le drag
    if (gameState.isComplete || timeLeft === 0) return;
    
    // Déterminer la source (step-pool ou timeline)
    const isInUserOrder = gameState.userOrder.includes(id);
    const droppableId = isInUserOrder ? 'timeline' : 'step-pool';
    
    setDragSource({
      droppableId,
      index
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    
    // Si le jeu est terminé ou le temps est écoulé, ne pas permettre le drop
    if (gameState.isComplete || timeLeft === 0) return;
    
    if (!dragSource) return;

    // Déterminer la destination
    const destinationElement = e.currentTarget;
    const destinationId = destinationElement.getAttribute('data-droppable-id');
    
    if (!destinationId) {
      console.error("Élément de destination sans identifiant");
      return;
    }

    // Récupérer les données de l'élément déplacé
    const dragDataStr = e.dataTransfer.getData('text/plain');
    if (!dragDataStr) return;
    
    try {
      const dragData: DragData = JSON.parse(dragDataStr);
      
      // Créer un résultat similaire à celui de react-beautiful-dnd
      const result = {
        source: dragSource,
        destination: {
          droppableId: destinationId,
          index
        }
      };

      // Utiliser la logique existante pour gérer le drag and drop
      handleDragEnd(result);
    } catch (error) {
      console.error("Erreur lors du parsing des données de drag", error);
    }
    
    setDragSource(null);
  };

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    // Si l'élément est déposé en dehors d'une zone valide
    if (!destination) {
      return;
    }

    // Si l'élément est déposé dans la même zone et à la même position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Copier l'état actuel
    const newGameState = { ...gameState };

    // Si l'élément est déplacé de la zone de départ vers la timeline
    if (source.droppableId === 'step-pool' && destination.droppableId === 'timeline') {
      // Trouver l'étape déplacée
      const stepId = gameState.steps.filter(step => !gameState.userOrder.includes(step.id))[source.index].id;
      
      // Ajouter l'étape à la position spécifiée dans la timeline
      newGameState.userOrder = [
        ...newGameState.userOrder.slice(0, destination.index),
        stepId,
        ...newGameState.userOrder.slice(destination.index)
      ];
    }
    // Si l'élément est déplacé au sein de la timeline
    else if (source.droppableId === 'timeline' && destination.droppableId === 'timeline') {
      // Réorganiser les étapes dans la timeline
      const stepId = newGameState.userOrder[source.index];
      newGameState.userOrder.splice(source.index, 1);
      newGameState.userOrder.splice(destination.index, 0, stepId);
    }
    // Si l'élément est déplacé de la timeline vers la zone de départ (retrait)
    else if (source.droppableId === 'timeline' && destination.droppableId === 'step-pool') {
      // Retirer l'étape de la timeline
      newGameState.userOrder.splice(source.index, 1);
    }

    // Vérifier si l'ordre est correct
    checkOrder(newGameState);
  };

  const checkOrder = (state: GameState) => {
    const { userOrder, correctOrder } = state;
    
    // Si aucune étape n'a été placée
    if (userOrder.length === 0) {
      state.feedback = 'Placez les étapes dans le bon ordre';
      setGameState(state);
      return;
    }

    // Vérifier si les étapes placées sont dans le bon ordre
    let isCorrect = true;
    let score = 0;

    for (let i = 0; i < userOrder.length; i++) {
      if (userOrder[i] === correctOrder[i]) {
        score += 10;
      } else {
        isCorrect = false;
      }
    }

    // Si toutes les étapes ont été placées et sont dans le bon ordre
    if (userOrder.length === correctOrder.length && isCorrect) {
      state.isComplete = true;
      state.endTime = Date.now();
      
      // Arrêter le chronomètre
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Bonus pour le temps restant (max 100 points)
      const timeBonus = Math.floor(timeLeft * (100 / INITIAL_TIME));
      
      state.score = score + timeBonus;
      state.feedback = 'Bravo ! Vous avez correctement placé toutes les étapes de la PLS !';
    } 
    // Si toutes les étapes ont été placées mais pas dans le bon ordre
    else if (userOrder.length === correctOrder.length && !isCorrect) {
      state.feedback = 'Toutes les étapes sont placées, mais l\'ordre n\'est pas correct. Réorganisez-les !';
      state.score = score;
    } 
    // Si certaines étapes sont correctement placées
    else if (isCorrect) {
      state.feedback = 'Bon début ! Continuez à placer les étapes suivantes.';
      state.score = score;
    } 
    // Si certaines étapes sont mal placées
    else {
      state.feedback = 'Attention, certaines étapes ne sont pas dans le bon ordre !';
      state.score = score;
    }

    setGameState(state);
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    // Marquer le tutoriel comme vu
    localStorage.setItem('pls_tutorial_seen', 'true');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="main-container">
        <header className="header-styled mb-8 text-center">
          <h1 className="text-3xl font-bold text-red-cross mb-2 title-styled">Le Séquenceur PLS</h1>
          <p className="text-dark-gray mb-2">
            Placez les étapes de la Position Latérale de Sécurité dans le bon ordre <span className="font-bold">EN MOINS DE 2 MINUTES</span>
          </p>
          <p className="text-sm text-gray-500 italic">
            Créé pour l'exercice de recrutement de coordinateur marketing digital - Avril 2025
          </p>
        </header>

        <Feedback 
          feedback={gameState.feedback}
          score={gameState.score}
          isComplete={gameState.isComplete || timeLeft === 0}
          onReset={initGame}
          timeLeft={timeLeft}
          onTimeUp={handleTimeUp}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[calc(100vh-300px)]">
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold mb-4 text-dark-gray">Étapes disponibles</h2>
            <StepPool 
              steps={gameState.steps} 
              userOrder={gameState.userOrder}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          </div>

          <div className="md:col-span-1 flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4 text-dark-gray">Timeline</h2>
            <div className="flex-grow">
              <Timeline 
                steps={gameState.steps} 
                userOrder={gameState.userOrder}
                correctOrder={gameState.correctOrder}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p> {new Date().getFullYear()} Le Séquenceur PLS - Apprendre les gestes qui sauvent</p>
        </footer>
      </div>
      
      {/* Tutoriel */}
      {showTutorial && <Tutorial onClose={handleCloseTutorial} />}
    </div>
  );
};

export default PLSGame;
