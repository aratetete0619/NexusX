import React, { MouseEvent, useState } from 'react';
import { useDispatch } from '../hooks/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteNode, deleteAllNodes, showToolbuttonAction } from '../redux/actions';
import styles from '../styles/Toolbutton.module.css';
import { NODE_WIDTH } from '../constants/constants';
import NodeSettings from './NodeSettings';

interface ToolbuttonProps {
  deleteNode: Function;
  selectedNodeId: string;
  showToolbutton: boolean;
  toolbuttonPosition: { x: number; y: number };
}

const Toolbutton: React.FC<ToolbuttonProps> = ({ deleteNode, selectedNodeId, showToolbutton, toolbuttonPosition }) => {
  const dispatch = useDispatch();
  const [showNodeSettings, setShowNodeSettings] = useState(false);


  const handleAddNode = (e: MouseEvent) => {
    e.stopPropagation();
    setShowNodeSettings(true);
  };

  const handleDeleteNode = (e: MouseEvent) => {
    e.stopPropagation();
    if (selectedNodeId !== null) {
      dispatch(deleteNode(selectedNodeId));
      dispatch(showToolbuttonAction(false));
    } else {
      window.alert("No node is selected for deletion. Please select a node first.");
    }
  };

  const handleDeleteAllNodes = (e: MouseEvent) => {
    e.stopPropagation();
    // dispatch(deleteAllNodes());
  };

  return (
    <div
      className={styles.toolbar}
      style={{
        position: "absolute",
        top: `${toolbuttonPosition.y}px`,
        left: `${toolbuttonPosition.x + NODE_WIDTH}px`,
        visibility: showToolbutton ? 'visible' : 'hidden',
      }}
    >
      <button className={styles.button} onClick={handleAddNode}><FontAwesomeIcon icon={faPlus} /> Add Node</button>
      <button className={styles.button} onClick={handleDeleteNode}><FontAwesomeIcon icon={faTrash} /> Delete Node</button>
      <button className={styles.button} onClick={handleDeleteAllNodes}><FontAwesomeIcon icon={faTrashAlt} /> Delete All Nodes</button>
      {showNodeSettings && <NodeSettings toolbuttonPosition={toolbuttonPosition} setShowNodeSettings={setShowNodeSettings} />}
    </div>
  );
}

export default Toolbutton;
