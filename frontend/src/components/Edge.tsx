import React from 'react';
import { useSelector } from 'react-redux';
import EdgeSvg from './EdgeSvg';


const Edges: React.FC = () => {
  const edges = useSelector(state => state.edges);
  const handlePositions = useSelector(state => state.handlePositions);
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      {edges.map(edge => {
        const fromHandle = handlePositions[edge.source.nodeId][edge.source.position];
        const toHandle = handlePositions[edge.target.nodeId][edge.target.position];

        if (fromHandle && toHandle) {
          return (
            <EdgeSvg
              key={edge.id}
              fromHandle={fromHandle}
              toHandle={toHandle}
              color="black"
            />
          );
        }

        return null;
      })}
    </svg>
  );
};


export default Edges;
