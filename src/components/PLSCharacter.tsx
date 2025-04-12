import React, { useEffect, useState } from 'react';

interface PLSCharacterProps {
  correctSteps: number[];
  totalSteps: number;
}

const PLSCharacter: React.FC<PLSCharacterProps> = ({ correctSteps, totalSteps }) => {
  const [currentAnimation, setCurrentAnimation] = useState<number>(0);
  const [animationKey, setAnimationKey] = useState<number>(0);
  
  // Mettre à jour l'animation en fonction des étapes correctes
  useEffect(() => {
    // Compter le nombre d'étapes correctes consécutives depuis le début
    let consecutiveCorrect = 0;
    for (let i = 0; i < totalSteps; i++) {
      if (correctSteps.includes(i)) {
        consecutiveCorrect++;
      } else {
        break;
      }
    }
    
    if (consecutiveCorrect !== currentAnimation) {
      // Déclencher l'animation de transition
      setAnimationKey(prev => prev + 1);
      setCurrentAnimation(consecutiveCorrect);
    }
  }, [correctSteps, totalSteps, currentAnimation]);
  
  // Texte descriptif pour l'étape actuelle
  const getStepDescription = () => {
    const descriptions = [
      "Placez la première étape pour commencer la démonstration",
      "Vérification de l'état de conscience",
      "Libération des voies aériennes",
      "Vérification de la respiration",
      "Placement du bras côté retournement",
      "Placement de l'autre bras sur la poitrine",
      "Flexion de la jambe côté opposé",
      "Retournement de la victime",
      "Stabilisation de la position",
      "Vérification régulière de la respiration"
    ];
    
    return descriptions[currentAnimation] || descriptions[0];
  };
  
  return (
    <div className="pls-character-container">
      <h3 className="text-lg font-bold mb-3 text-center text-dark-gray">Démonstration PLS</h3>
      <div className="pls-character" key={animationKey}>
        {/* Personnage SVG avec différentes positions */}
        <svg 
          width="200" 
          height="200" 
          viewBox="0 0 200 200" 
          className="character-svg"
        >
          {/* Position initiale - personne allongée sur le dos */}
          {currentAnimation === 0 && (
            <g>
              <ellipse cx="100" cy="50" rx="20" ry="20" fill="#FFD7B5" stroke="#000" strokeWidth="1.5" /> {/* Tête */}
              <line x1="100" y1="70" x2="100" y2="120" stroke="#000" strokeWidth="3" /> {/* Corps */}
              <line x1="100" y1="80" x2="70" y2="100" stroke="#000" strokeWidth="3" /> {/* Bras gauche */}
              <line x1="100" y1="80" x2="130" y2="100" stroke="#000" strokeWidth="3" /> {/* Bras droit */}
              <line x1="100" y1="120" x2="70" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe gauche */}
              <line x1="100" y1="120" x2="130" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe droite */}
            </g>
          )}
          
          {/* Étape 1 - Vérification de l'état de conscience */}
          {currentAnimation === 1 && (
            <g>
              <ellipse cx="100" cy="50" rx="20" ry="20" fill="#FFD7B5" stroke="#000" strokeWidth="1.5" /> {/* Tête */}
              <line x1="100" y1="70" x2="100" y2="120" stroke="#000" strokeWidth="3" /> {/* Corps */}
              <line x1="100" y1="80" x2="70" y2="100" stroke="#000" strokeWidth="3" /> {/* Bras gauche */}
              <line x1="100" y1="80" x2="130" y2="100" stroke="#000" strokeWidth="3" /> {/* Bras droit */}
              <line x1="100" y1="120" x2="70" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe gauche */}
              <line x1="100" y1="120" x2="130" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe droite */}
              
              {/* Secouriste */}
              <ellipse cx="50" cy="30" rx="15" ry="15" fill="#FFD7B5" stroke="#000" strokeWidth="1.5" /> {/* Tête */}
              <line x1="50" y1="45" x2="50" y2="80" stroke="#000" strokeWidth="2" /> {/* Corps */}
              <line x1="50" y1="55" x2="75" y2="50" stroke="#000" strokeWidth="2" /> {/* Bras touchant l'épaule */}
              <text x="30" y="20" fontSize="10">?</text>
            </g>
          )}
          
          {/* Étape 2 - Libération des voies aériennes */}
          {currentAnimation === 2 && (
            <g>
              <ellipse cx="100" cy="50" rx="20" ry="20" fill="#FFD7B5" stroke="#000" strokeWidth="1.5" transform="rotate(15, 100, 50)" /> {/* Tête basculée */}
              <line x1="100" y1="70" x2="100" y2="120" stroke="#000" strokeWidth="3" /> {/* Corps */}
              <line x1="100" y1="80" x2="70" y2="100" stroke="#000" strokeWidth="3" /> {/* Bras gauche */}
              <line x1="100" y1="80" x2="130" y2="100" stroke="#000" strokeWidth="3" /> {/* Bras droit */}
              <line x1="100" y1="120" x2="70" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe gauche */}
              <line x1="100" y1="120" x2="130" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe droite */}
              
              {/* Main du secouriste */}
              <path d="M80,40 C75,35 70,45 80,50" stroke="#000" fill="none" strokeWidth="1.5" />
            </g>
          )}
          
          {/* Étape 3 - Vérification de la respiration */}
          {currentAnimation === 3 && (
            <g>
              <ellipse cx="100" cy="50" rx="20" ry="20" fill="#FFD7B5" stroke="#000" strokeWidth="1.5" transform="rotate(15, 100, 50)" /> {/* Tête basculée */}
              <line x1="100" y1="70" x2="100" y2="120" stroke="#000" strokeWidth="3" /> {/* Corps */}
              <line x1="100" y1="80" x2="70" y2="100" stroke="#000" strokeWidth="3" /> {/* Bras gauche */}
              <line x1="100" y1="80" x2="130" y2="100" stroke="#000" strokeWidth="3" /> {/* Bras droit */}
              <line x1="100" y1="120" x2="70" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe gauche */}
              <line x1="100" y1="120" x2="130" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe droite */}
              
              {/* Secouriste vérifiant la respiration */}
              <ellipse cx="60" cy="40" rx="15" ry="15" fill="#FFD7B5" stroke="#000" strokeWidth="1.5" /> {/* Tête */}
              <path d="M70,45 C80,50 85,55 80,60" stroke="#000" fill="none" strokeWidth="1.5" /> {/* Oreille près de la bouche */}
              <path d="M60,55 C65,60 70,65 75,70" stroke="#000" fill="none" strokeWidth="1.5" /> {/* Regard vers la poitrine */}
            </g>
          )}
          
          {/* Étape 4 - Placement du bras côté retournement */}
          {currentAnimation === 4 && (
            <g>
              <ellipse cx="100" cy="50" rx="20" ry="20" fill="#FFD7B5" stroke="#000" strokeWidth="1.5" /> {/* Tête */}
              <line x1="100" y1="70" x2="100" y2="120" stroke="#000" strokeWidth="3" /> {/* Corps */}
              <line x1="100" y1="80" x2="60" y2="70" stroke="#000" strokeWidth="3" /> {/* Bras gauche à 90° */}
              <line x1="60" y1="70" x2="50" y2="90" stroke="#000" strokeWidth="3" /> {/* Avant-bras gauche plié */}
              <line x1="100" y1="80" x2="130" y2="100" stroke="#000" strokeWidth="3" /> {/* Bras droit */}
              <line x1="100" y1="120" x2="70" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe gauche */}
              <line x1="100" y1="120" x2="130" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe droite */}
            </g>
          )}
          
          {/* Étape 5 - Placement de l'autre bras sur la poitrine */}
          {currentAnimation === 5 && (
            <g>
              <ellipse cx="100" cy="50" rx="20" ry="20" fill="#FFD7B5" stroke="#000" strokeWidth="1.5" /> {/* Tête */}
              <line x1="100" y1="70" x2="100" y2="120" stroke="#000" strokeWidth="3" /> {/* Corps */}
              <line x1="100" y1="80" x2="60" y2="70" stroke="#000" strokeWidth="3" /> {/* Bras gauche à 90° */}
              <line x1="60" y1="70" x2="50" y2="90" stroke="#000" strokeWidth="3" /> {/* Avant-bras gauche plié */}
              <line x1="100" y1="80" x2="120" y2="70" stroke="#000" strokeWidth="3" /> {/* Bras droit */}
              <line x1="120" y1="70" x2="100" y2="90" stroke="#000" strokeWidth="3" /> {/* Avant-bras droit sur la poitrine */}
              <line x1="100" y1="120" x2="70" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe gauche */}
              <line x1="100" y1="120" x2="130" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe droite */}
            </g>
          )}
          
          {/* Étape 6 - Flexion de la jambe côté opposé */}
          {currentAnimation === 6 && (
            <g>
              <ellipse cx="100" cy="50" rx="20" ry="20" fill="#FFD7B5" stroke="#000" strokeWidth="1.5" /> {/* Tête */}
              <line x1="100" y1="70" x2="100" y2="120" stroke="#000" strokeWidth="3" /> {/* Corps */}
              <line x1="100" y1="80" x2="60" y2="70" stroke="#000" strokeWidth="3" /> {/* Bras gauche à 90° */}
              <line x1="60" y1="70" x2="50" y2="90" stroke="#000" strokeWidth="3" /> {/* Avant-bras gauche plié */}
              <line x1="100" y1="80" x2="120" y2="70" stroke="#000" strokeWidth="3" /> {/* Bras droit */}
              <line x1="120" y1="70" x2="100" y2="90" stroke="#000" strokeWidth="3" /> {/* Avant-bras droit sur la poitrine */}
              <line x1="100" y1="120" x2="70" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe gauche */}
              <line x1="100" y1="120" x2="130" y2="130" stroke="#000" strokeWidth="3" /> {/* Cuisse droite */}
              <line x1="130" y1="130" x2="120" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe droite pliée */}
            </g>
          )}
          
          {/* Étape 7 - Retournement de la victime */}
          {currentAnimation === 7 && (
            <g transform="rotate(45, 100, 100)">
              <ellipse cx="100" cy="50" rx="20" ry="20" fill="#FFD7B5" stroke="#000" strokeWidth="1.5" /> {/* Tête */}
              <line x1="100" y1="70" x2="100" y2="120" stroke="#000" strokeWidth="3" /> {/* Corps */}
              <line x1="100" y1="80" x2="60" y2="70" stroke="#000" strokeWidth="3" /> {/* Bras gauche à 90° */}
              <line x1="60" y1="70" x2="50" y2="90" stroke="#000" strokeWidth="3" /> {/* Avant-bras gauche plié */}
              <line x1="100" y1="80" x2="120" y2="70" stroke="#000" strokeWidth="3" /> {/* Bras droit */}
              <line x1="120" y1="70" x2="100" y2="90" stroke="#000" strokeWidth="3" /> {/* Avant-bras droit sur la poitrine */}
              <line x1="100" y1="120" x2="70" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe gauche */}
              <line x1="100" y1="120" x2="130" y2="130" stroke="#000" strokeWidth="3" /> {/* Cuisse droite */}
              <line x1="130" y1="130" x2="120" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe droite pliée */}
            </g>
          )}
          
          {/* Étape 8 - Stabilisation de la position */}
          {currentAnimation === 8 && (
            <g transform="rotate(90, 100, 100)">
              <ellipse cx="100" cy="50" rx="20" ry="20" fill="#FFD7B5" stroke="#000" strokeWidth="1.5" /> {/* Tête */}
              <line x1="100" y1="70" x2="100" y2="120" stroke="#000" strokeWidth="3" /> {/* Corps */}
              <line x1="100" y1="80" x2="60" y2="70" stroke="#000" strokeWidth="3" /> {/* Bras gauche à 90° */}
              <line x1="60" y1="70" x2="50" y2="90" stroke="#000" strokeWidth="3" /> {/* Avant-bras gauche plié */}
              <line x1="100" y1="80" x2="120" y2="70" stroke="#000" strokeWidth="3" /> {/* Bras droit */}
              <line x1="120" y1="70" x2="90" y2="60" stroke="#000" strokeWidth="3" /> {/* Avant-bras droit stabilisant la tête */}
              <line x1="100" y1="120" x2="70" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe gauche */}
              <line x1="100" y1="120" x2="130" y2="130" stroke="#000" strokeWidth="3" /> {/* Cuisse droite */}
              <line x1="130" y1="130" x2="120" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe droite pliée */}
            </g>
          )}
          
          {/* Étape 9 - Vérification régulière de la respiration */}
          {currentAnimation === 9 && (
            <g>
              <g transform="rotate(90, 100, 100)">
                <ellipse cx="100" cy="50" rx="20" ry="20" fill="#FFD7B5" stroke="#000" strokeWidth="1.5" /> {/* Tête */}
                <line x1="100" y1="70" x2="100" y2="120" stroke="#000" strokeWidth="3" /> {/* Corps */}
                <line x1="100" y1="80" x2="60" y2="70" stroke="#000" strokeWidth="3" /> {/* Bras gauche à 90° */}
                <line x1="60" y1="70" x2="50" y2="90" stroke="#000" strokeWidth="3" /> {/* Avant-bras gauche plié */}
                <line x1="100" y1="80" x2="120" y2="70" stroke="#000" strokeWidth="3" /> {/* Bras droit */}
                <line x1="120" y1="70" x2="90" y2="60" stroke="#000" strokeWidth="3" /> {/* Avant-bras droit stabilisant la tête */}
                <line x1="100" y1="120" x2="70" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe gauche */}
                <line x1="100" y1="120" x2="130" y2="130" stroke="#000" strokeWidth="3" /> {/* Cuisse droite */}
                <line x1="130" y1="130" x2="120" y2="160" stroke="#000" strokeWidth="3" /> {/* Jambe droite pliée */}
              </g>
              
              {/* Secouriste vérifiant la respiration */}
              <ellipse cx="40" cy="50" rx="15" ry="15" fill="#FFD7B5" stroke="#000" strokeWidth="1.5" /> {/* Tête */}
              <path d="M50,55 C60,60 65,65 60,70" stroke="#000" fill="none" strokeWidth="1.5" /> {/* Oreille près de la bouche */}
              <path d="M40,65 C45,70 50,75 55,80" stroke="#000" fill="none" strokeWidth="1.5" /> {/* Regard vers la poitrine */}
              
              {/* Symbole de respiration */}
              <path d="M80,50 Q90,40 100,50 Q110,60 120,50" stroke="#000" fill="none" strokeWidth="1" className="breathing-animation" />
            </g>
          )}
        </svg>
      </div>
      <div className="pls-character-description text-center mt-2 text-sm text-gray-700">
        {getStepDescription()}
      </div>
    </div>
  );
};

export default PLSCharacter;
