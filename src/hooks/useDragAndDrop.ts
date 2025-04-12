import { useState, useEffect } from 'react';

export interface DragItem {
  id: string;
  type: string;
  index: number;
}

export interface DropResult {
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  } | null;
}

export const useDragAndDrop = (onDragEnd: (result: DropResult) => void) => {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dragSource, setDragSource] = useState<{ droppableId: string; index: number } | null>(null);

  useEffect(() => {
    // Nettoyer l'état de drag lorsque le composant est démonté
    return () => {
      setDraggedItem(null);
      setDragSource(null);
    };
  }, []);

  const handleDragStart = (item: DragItem, droppableId: string) => {
    setDraggedItem(item);
    setDragSource({
      droppableId,
      index: item.index
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, droppableId: string, index: number) => {
    e.preventDefault();
    
    if (!draggedItem || !dragSource) return;

    const result: DropResult = {
      source: dragSource,
      destination: {
        droppableId,
        index
      }
    };

    onDragEnd(result);
    setDraggedItem(null);
    setDragSource(null);
  };

  const handleDragEnd = () => {
    if (!draggedItem || !dragSource) return;

    // Si l'élément est déposé en dehors d'une zone valide
    const result: DropResult = {
      source: dragSource,
      destination: null
    };

    onDragEnd(result);
    setDraggedItem(null);
    setDragSource(null);
  };

  return {
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  };
};
