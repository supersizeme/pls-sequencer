import { Step } from '../types';

export const stepsData: Step[] = [
  {
    id: 'check-breathing',
    content: 'Vérifier la respiration',
    description: 'S\'assurer que la personne respire normalement',
    image: '/images/check-breathing.svg'
  },
  {
    id: 'call-emergency',
    content: 'Appeler les secours',
    description: 'Composer le 15, 18 ou 112 pour alerter les secours',
    image: '/images/call-emergency.svg'
  },
  {
    id: 'arm-position',
    content: 'Placer le bras à 90°',
    description: 'Placer le bras du côté où la personne sera tournée à 90° par rapport au corps',
    image: '/images/arm-position.svg'
  },
  {
    id: 'opposite-arm',
    content: 'Placer l\'autre main contre la joue',
    description: 'Prendre la main opposée et la placer contre la joue de la victime',
    image: '/images/opposite-arm.svg'
  },
  {
    id: 'bend-knee',
    content: 'Plier le genou opposé',
    description: 'Plier le genou du côté opposé à celui où la personne sera tournée',
    image: '/images/bend-knee.svg'
  },
  {
    id: 'roll-person',
    content: 'Rouler la personne',
    description: 'Faire rouler la personne sur le côté en maintenant sa main contre sa joue',
    image: '/images/roll-person.svg'
  },
  {
    id: 'adjust-head',
    content: 'Ajuster la tête',
    description: 'S\'assurer que la tête est en légère extension pour maintenir les voies aériennes dégagées',
    image: '/images/adjust-head.svg'
  },
  {
    id: 'check-position',
    content: 'Vérifier la position finale',
    description: 'S\'assurer que la position est stable et que la personne peut respirer librement',
    image: '/images/check-position.svg'
  }
];

export const correctOrderIds = [
  'check-breathing',
  'call-emergency',
  'arm-position',
  'opposite-arm',
  'bend-knee',
  'roll-person',
  'adjust-head',
  'check-position'
];
