import React, { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { deleteNode, deleteAllNodes, showNodeSettings, showToolbuttonAction } from '../redux/actions';
import NodeSettings from './NodeSettings';
import '../styles/Toolbutton.css';
import { NODE_WIDTH } from '../constants/constants';

const Toolbutton: React.FC = () => {
  const dispatch = useDispatch();
  const selectedNodeId = useSelector((state: RootState) => state.selectedNodeId);
  const showToolbutton = useSelector((state: RootState) => state.showToolbutton);
  const toolbuttonPosition = useSelector((state: RootState) => state.toolbuttonPosition);
  const isNodeSettingsVisible = useSelector((state: RootState) => state.showNodeSettings);




  const handleAddNode = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(showNodeSettings());
    dispatch(showToolbuttonAction(false));
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
    dispatch(deleteAllNodes());
  };

  const handleCreateSiblingNode = (e: MouseEvent) => {
    e.stopPropagation();
    if (selectedNodeId !== null) {
      dispatch(createSiblingNode());
    } else {
      window.alert("No node is selected to create a sibling. Please select a node first.");
    }
  };

  return (
    <>
      {isNodeSettingsVisible ? (
        <NodeSettings />
      ) : (
        showToolbutton && (
          <div
            className="toolbar"
            style={{
              top: `${toolbuttonPosition.y}px`,
              left: `${toolbuttonPosition.x + NODE_WIDTH}px`, // ノードの右端に配置
              visibility: showToolbutton ? 'visible' : 'hidden',
            }}
          >
            <button className="button" onClick={handleAddNode}>Add Node</button>
            <button className="button" onClick={handleDeleteNode}>Delete Node</button>
            <button className="button" onClick={handleDeleteAllNodes}>Delete All Nodes</button>
            <button className="button" onClick={handleCreateSiblingNode}>Create Sibling Node</button>
          </div>
        )
      )}
    </>
  );

}

export default Toolbutton;
