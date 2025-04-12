export interface Step {
  id: string;
  content: string;
  description: string;
  image: string;
}

export interface GameState {
  steps: Step[];
  correctOrder: string[];
  userOrder: string[];
  currentStep: number;
  score: number;
  isComplete: boolean;
  feedback: string;
  startTime: number | null;
  endTime: number | null;
}
