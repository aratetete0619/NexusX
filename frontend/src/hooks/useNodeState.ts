import { useState } from 'react';
import { Node, Edge } from '../types';
import { calculateEdgeCenter, calculateSiblingNodePosition } from '../helpers';

export const useNodeState = (initialNodes: Node[], initialEdges: Edge[]) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);

  // Add state management for toolbar visibility and position
  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const [toolbarPosition, setToolbarPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const addNode = (parentId: number | null = null, parentEdgeId: number | null = null): Node => {
    // Find the parent node and the selected node
    const parentNode = nodes.find(node => node.id === parentId);
    const selectedNode = nodes.find(node => node.id === selectedNodeId);

    // Calculate the new node position
    let newNodePosition;
    if (parentNode && selectedNode) {
      const edgeCenter = calculateEdgeCenter(parentNode, selectedNode);
      newNodePosition = calculateSiblingNodePosition(edgeCenter, selectedNode);
    } else {
      // Default to random position if parent node or selected node is not found
      newNodePosition = {
        x: Math.round(Math.random() * 500),
        y: Math.round(Math.random() * 500),
      };
    }


    const newNode = {
      id: Date.now(),
      name: `Node ${nodes.length + 1}`,
      x: newNodePosition.x,
      y: newNodePosition.y,
      isNew: true,
      parentId: selectedNodeId,
    };

    setNodes(nodes.concat([newNode]));

    if (nodes.length > 0) {
      const newEdge = {
        id: Date.now(),
        from: selectedNodeId,
        to: newNode.id,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        parentEdge: parentEdgeId,
      };
      setEdges(edges.concat([newEdge]));
    }


    setSelectedNodeId(newNode.id);
    return newNode;
  };


  const updateNodeName = (id: number, newName: string) => {
    setNodes(nodes.map(node => node.id === id ? { ...node, name: newName, isNew: false } : node));
  };


  const discardNewNode = (id: number) => {
    setNodes(nodes.filter(node => node.id !== id));
  };

  const deselectNode = () => {
    setSelectedNodeId(null);
  };


  const selectNode = (nodeId: number) => {
    if (nodeId !== selectedNodeId) {
      setSelectedNodeId(nodeId);
    }
  };

  const moveNode = (id: number, x: number, y: number) => {
    setNodes(nodes.map(node => node.id === id ? { ...node, x, y } : node));
  };

  const deleteNode = () => {
    setNodes(nodes.filter(node => node.id !== selectedNodeId));
    setEdges(edges.filter(edge => edge.from !== selectedNodeId && edge.to !== selectedNodeId));
    setSelectedNodeId(null); // 選択をリセット
  };

  const deleteAllNodes = () => {
    // 最初のノードのデータを保存
    const initialNode = nodes[0];
    const relatedEdges = edges.filter(edge => edge.from === initialNode.id || edge.to === initialNode.id);

    // 最初のノードとそれに関連するエッジだけを残す
    setNodes([initialNode]);
    setEdges(relatedEdges);

    // ローカルストレージを更新
    localStorage.setItem("nodes", JSON.stringify([initialNode]));
    localStorage.setItem("edges", JSON.stringify(relatedEdges));

    // 最初のノードを選択状態にする
    setSelectedNodeId(initialNode.id);
  };


  const createSiblingNode = () => {
    if (selectedNodeId !== null) {
      const currentNode = nodes.find(node => node.id === selectedNodeId);
      if (currentNode.parentId) {
        const parentEdge = edges.find(edge => edge.to === selectedNodeId);
        const siblingNode = addNode(currentNode.parentId, parentEdge.id);  // pass the parent id and the parent edge id to the addNode function
        setSelectedNodeId(siblingNode.id);
      }
    }
  };



  const NODE_WIDTH = 100; // あなたのノードの幅に応じて調整してください
  const NODE_HEIGHT = 50; // あなたのノードの高さに応じて調整してください
  const TOOLBAR_WIDTH = 200; // あなたのツールバーの幅に応じて調整してください
  const TOOLBAR_HEIGHT = 200; // あなたのツールバーの高さに応じて調整してください

  const showNodeToolbar = (x: number, y: number) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let toolbarX = x - TOOLBAR_WIDTH / 2 + NODE_WIDTH / 2;
    let toolbarY = y + NODE_HEIGHT;

    // Check if the toolbar goes out of the right edge of the window
    if (toolbarX + TOOLBAR_WIDTH > windowWidth) {
      toolbarX = windowWidth - TOOLBAR_WIDTH;
    }

    // Check if the toolbar goes out of the left edge of the window
    if (toolbarX < 0) {
      toolbarX = 0;
    }

    // Check if the toolbar goes out of the bottom edge of the window
    if (toolbarY + TOOLBAR_HEIGHT > windowHeight) {
      toolbarY = windowHeight - TOOLBAR_HEIGHT;
    }

    setToolbarPosition({ x: toolbarX, y: toolbarY });
    setShowToolbar(true);
  };

  const handlePageClick = (e: MouseEvent) => {
    // If the click event was not on a node or toolbar, hide the toolbar.
    if (!e.target.closest('.node') && !e.target.closest('.toolbar')) {
      setShowToolbar(false);
    }
  };

  return {
    nodes,
    edges,
    selectedNodeId,
    addNode,
    updateNodeName,
    discardNewNode,
    deselectNode,
    selectNode,
    moveNode,
    deleteNode,
    deleteAllNodes,
    createSiblingNode,
    showNodeToolbar,
    handlePageClick,
    showToolbar,
    toolbarPosition,
  };
};
