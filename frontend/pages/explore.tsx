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
  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

  if (typeof jwtSecret == 'string') {
    try {
      jwt.verify(token, jwtSecret);
    } catch (error) {
      context.res.setHeader('location', '/login');
      context.res.statusCode = 302;
    }
  }

  return { props: { token } };
};

const ExplorePage: React.FC = () => {
  const [viewport, setViewport] = useState({ x: 0, y: 0 });
  const [showDraggableComponents, setShowDraggableComponents] = useState(true);
  const [showEdges, setShowEdges] = useState(false);
  const errorContext = useContext(ErrorContext);
  if (!errorContext) {
    throw new Error('ErrorContext not provided');
  }
  const { showError } = errorContext;

  const handleViewportChange = (dx: number, dy: number) => {
    setViewport(prevViewport => ({
      x: prevViewport.x + dx,
      y: prevViewport.y + dy
    }));
  };

  const handleError = (message: string) => {
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
        <PolarNodeDragLayer />
        {showDraggableComponents && <CustomDragLayer setShowEdges={setShowEdges} />}
        {showDraggableComponents &&
          <DraggableSearchArea
            onViewportChange={handleViewportChange}
            onError={handleError}
            setShowEdges={setShowEdges}
          />
        }
        <PolarChart
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
