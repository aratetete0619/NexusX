import React, { useState, useEffect, useRef } from 'react';
import '../styles/Node.css';
import { useDrag } from 'react-dnd';
import Toolbutton from './Toolbutton';
import IconButton from './IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { Node as NodeType } from '../types/index';
import { useSelector, useDispatch } from 'react-redux';
import { updateNodeName, setSelectedNodeId, discardNewNode, deleteNode, showToolbuttonAction, setNodeEditing, setNodeName, setToolbuttonPositionAction, hideNodeSettings } from '../redux/actions';

interface NodeProps {
  node: NodeType;
}

const Node: React.FC<NodeProps> = ({ node }) => {
  const dispatch = useDispatch();
  const selectedNodeId = useSelector((state: RootState) => state.nodes.selectedNodeId);
  const name = useSelector(state => state.nodeName[node.id]) || node.name;
  const selected = useSelector((state: RootState) => state.selectedNodeId) === node.id;
  const isEditing = useSelector((state: RootState) => state.nodeEditing[node.id]) || false;
  const showToolbutton = useSelector((state: RootState) => state.showToolbutton);
  const [toolbuttonPosition, setToolbuttonPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  useEffect(() => {
    if (selected && nodeRef.current) {
      const rect = nodeRef.current;
      setToolbuttonPosition({ x: rect.offsetLeft + rect.offsetWidth, y: rect.offsetTop });
    }
  }, [selected, node.x, node.y]);


  const [{ }, drag] = useDrag({
    type: `Node`,
    item: { id: node.id, left: node.x, top: node.y },
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (node.id !== selectedNodeId) {
      dispatch(setSelectedNodeId(node.id));
      dispatch(setToolbuttonPositionAction(node.x, node.y));
    }
  };


  const handleDoubleClick = () => {
    dispatch(setNodeEditing(node.id, true));
  }

  const handleInputChange = (event) => {
    dispatch(setNodeName(node.id, event.target.value));
  };

  const handleInputBlur = () => {
    if (name.trim() === "") {
      dispatch(discardNewNode(node.id));
    } else {
      dispatch(updateNodeName(node.id, name));
    }
    dispatch(setNodeEditing(node.id, false));
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    dispatch(setSelectedNodeId(node.id));
    dispatch(setToolbuttonPositionAction({ x: node.x, y: node.y }));
    dispatch(showToolbuttonAction(!showToolbutton));
    dispatch(hideNodeSettings());
  };



  return (
    <>
      <div
        className={`node ${selected ? 'selected' : ''}`}
        style={{
          position: "absolute",
          top: `${node.y}px`,
          left: `${node.x}px`,
          color: node.color,  // 文字色の設定
          backgroundColor: node.backgroundColor,  // 背景色の設定
        }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        ref={drag}
      >
        {isEditing
          ? <input type="text" autoFocus value={name} onChange={handleInputChange} onBlur={handleInputBlur} />
          : <>
            {node.name}
            {selected &&
              <div
                style={{ position: "absolute", right: 0, top: 0 }}>
                <IconButton aria-label="Example" onClick={handleButtonClick}>
                  <FontAwesomeIcon icon={faEllipsisV} />
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
    </>
  );

}

export default Node;
