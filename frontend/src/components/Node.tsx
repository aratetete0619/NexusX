import React, { useState, useRef } from 'react';
import '../styles/Node.css';
import { useDrag } from 'react-dnd';
import Handle from './Handle';
import Toolbutton from './Toolbutton';
import IconButton from './IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { Node as NodeType } from '../types/index';
import { useSelector, useDispatch } from '../hooks/hooks';
import { RootState } from '../redux/reducers';
import { updateNodeName, setSelectedNodeId, discardNewNode, deleteNode, setNodeEditing, setNodeName, hideNodeSettings, updateHandlePosition } from '../redux/actions';

interface NodeProps {
  node: NodeType;
}

const Node: React.FC<NodeProps> = ({ node }) => {
  const dispatch = useDispatch();
  const selectedNodeId = useSelector((state: RootState) => state.selectedNodeId);
  const selected = useSelector((state: RootState) => state.selectedNodeId) === node.id;
  const isEditing = useSelector((state: RootState) => state.nodeEditing[node.id]) || false;
  const [showToolbutton, setShowToolbutton] = useState(false);
  const [toolbuttonPosition, setToolbuttonPosition] = useState({ x: 0, y: 0 });

  const [{ }, drag] = useDrag<any, any, any>({
    type: `Node`,
    item: { id: node.id, left: node.x, top: node.y },
    end: (item, monitor) => {
      const newCoords = monitor.getClientOffset();
      if (item && newCoords) {
        setToolbuttonPosition({ x: newCoords.x, y: newCoords.y });
      }
    }
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.id !== selectedNodeId) {
      dispatch(setSelectedNodeId(node.id));
    }
  };

  const handleDoubleClick = () => {
    dispatch(setNodeEditing(node.id, true));
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNodeName(node.id, event.target.value));
  };

  const handleInputBlur = () => {
    if (node.name.trim() === "") {
      dispatch(discardNewNode(node.id));
    } else {
      dispatch(updateNodeName(node.id, node.name));
    }
    dispatch(setNodeEditing(node.id, false));
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setSelectedNodeId(node.id));
    setShowToolbutton(!showToolbutton);
    dispatch(hideNodeSettings());
  };

  const handlePositionChange = (position: "top" | "bottom" | "left" | "right", coords: { x: number, y: number }) => {
    dispatch(updateHandlePosition(node.id, position, coords));
  };

  return (
    <div
      style={{
        position: "absolute",
        top: `${node.y}px`,
        left: `${node.x}px`,
      }}>
      <div
        className={`node ${selected ? 'selected' : ''}`}
        style={{
          position: "absolute",
          color: node.color,
          backgroundColor: node.backgroundColor,
        }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        ref={drag}
      >
        {isEditing
          ? <input type="text" autoFocus value={node.name} onChange={handleInputChange} onBlur={handleInputBlur} />
          : <>
            {node.name}
            <Handle nodeId={node.id} position="top" onPositionChange={(coords) => handlePositionChange('top', coords)} />
            <Handle nodeId={node.id} position="bottom" onPositionChange={(coords) => handlePositionChange('bottom', coords)} />
            <Handle nodeId={node.id} position="left" onPositionChange={(coords) => handlePositionChange('left', coords)} />
            <Handle nodeId={node.id} position="right" onPositionChange={(coords) => handlePositionChange('right', coords)} />
            {selected &&
              <div
                style={{ position: "absolute", right: 0, top: 0 }}>
                <IconButton aria-label="Example" onClick={handleButtonClick}>
                  <FontAwesomeIcon icon={faEllipsisV} className="icon" />
                </IconButton>
              </div>
            }
          </>
        }
      </div>
      {showToolbutton && selected &&
        <Toolbutton
          deleteNode={() => dispatch(deleteNode(node.id))}
          selectedNodeId={node.id}
          showToolbutton={showToolbutton}
          toolbuttonPosition={toolbuttonPosition}
        />
      }
    </div>
  );
}

export default Node;
