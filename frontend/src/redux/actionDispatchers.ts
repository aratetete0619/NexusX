import { useDispatch } from 'react-redux';
import {
  addNode as addNodeAction,
  deleteNode as deleteNodeAction,
  updateNodeName as updateNodeNameAction,
  setSelectedNodeId,
  deleteAllNodes,
  moveNode,
  discardNewNode,
} from './actions';

export const useActionDispatchers = () => {
  const dispatch = useDispatch();

  const addNode = (parentId = null, parentEdgeId = null) => {
    dispatch(addNodeAction({ parentId, parentEdgeId }));
  };

  const updateNodeName = (id, newName) => {
    dispatch(updateNodeNameAction({ id, newName }));
  };

  const deleteNode = () => {
    dispatch(deleteNodeAction(selectedNodeId));
  };

  const selectNode = (nodeId) => {
    dispatch(setSelectedNodeId(nodeId));
  };

  // その他のローカル状態管理関数も適切に更新します。
  const deleteAll = () => {
    dispatch(deleteAllNodes());
  };

  const moveNodePosition = (id, x, y) => {
    dispatch(moveNode(id, x, y));
  };

  const discardNode = (id) => {
    dispatch(discardNewNode(id));
  };

  return {
    addNode,
    updateNodeName,
    deleteNode,
    selectNode,
    deleteAll,
    moveNodePosition,
    discardNode,
  };
};
