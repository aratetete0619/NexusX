// explore.tsx
import React, { useState, useContext } from 'react';
import DraggableSearchArea from '../src/components/DraggableSearchArea';
import PolarChart from '../src/components/PolarChart';
import MainLayout from '../src/components/layouts/MainLayout';
import CustomDragLayer from '@/src/components/CustomDragLayer';
import PolarNodeDragLayer from '@/src/components/PolarNodeDragLayer';
import PolarNodePopup from '../src/components/PolarNodePopup';
import { GetServerSideProps } from 'next';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import PolarNodeEdge from '../src/components/PolarNodeEdge';
import { ErrorContext } from '../src/contexts/ErrorContext';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies.token;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    // If the token is not valid, redirect to the login page
    context.res.setHeader('location', '/login');
    context.res.statusCode = 302;
    context.res.end();
    return { props: {} };
  }

  // If the token is valid, render the page
  return { props: { token } };
};

const ExplorePage: React.FC = () => {
  const [viewport, setViewport] = useState({ x: 0, y: 0 });
  const [showDraggableComponents, setShowDraggableComponents] = useState(true);
  const [showEdges, setShowEdges] = useState(false);
  const { showError } = useContext(ErrorContext);


  const handleViewportChange = (dx, dy) => {
    setViewport(prevViewport => ({
      x: prevViewport.x + dx,
      y: prevViewport.y + dy
    }));
  };

  const handleError = (message) => {
    showError(message);
  };

  const hideDraggableComponents = () => {
    setShowDraggableComponents(false);
  };

  const displayDraggableComponents = () => {
    setShowDraggableComponents(true);
  };

  return (
    <MainLayout>
      <div className="app">
        <PolarNodeDragLayer viewport={viewport} />
        {showDraggableComponents && <CustomDragLayer />}
        {showDraggableComponents &&
          <DraggableSearchArea
            viewport={viewport}
            onViewportChange={handleViewportChange}
            onError={handleError}
            setShowEdges={setShowEdges}
          />
        }
        <PolarChart
          viewport={viewport}
          showDraggableComponents={showDraggableComponents}
          displayDraggableComponents={displayDraggableComponents}
          hideDraggableComponents={hideDraggableComponents}
        />
        <PolarNodePopup
          hideDraggableComponents={hideDraggableComponents}
          setShowEdges={setShowEdges}
        />
        {showEdges && <PolarNodeEdge />}
      </div>
    </MainLayout>
  );
};

export default ExplorePage;
