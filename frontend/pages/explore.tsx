// ExplorePage.tsx
import React, { useState } from 'react';
import DraggableSearchArea from '../src/components/DraggableSearchArea';
import PolarChart from '../src/components/PolarChart';
import MainLayout from '../src/components/layouts/MainLayout'
import CustomDragLayer from '@/src/components/CustomDragLayer';
import PolarNodeDragLayer from '@/src/components/PolarNodeDragLayer'
import PolarNodePouup from '../src/components/PolarNodePopup'

const ExplorePage: React.FC = () => {
  const [viewport, setViewport] = useState({ x: 0, y: 0 });

  const handleViewportChange = (dx, dy) => {
    setViewport(prevViewport => ({
      x: prevViewport.x + dx,
      y: prevViewport.y + dy
    }));
  };

  return (
    <MainLayout>
      <div className="app">
        <CustomDragLayer />
        <PolarNodeDragLayer viewport={viewport} />
        <DraggableSearchArea viewport={viewport} onViewportChange={handleViewportChange} />
        <PolarChart viewport={viewport} />
        <PolarNodePouup />
      </div>
    </MainLayout>
  );
};

export default ExplorePage;
