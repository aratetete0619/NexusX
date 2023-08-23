import React, { useState, useEffect, MouseEvent } from 'react';
import { RootState } from '../redux/reducers';
import { useDrop } from 'react-dnd';
import Node from './Node';
import Edge from './Edge';
import { useMutation } from '@apollo/client';
import { SAVE_PAGE_DATA } from '../../src/graphql/mutations';
import '../styles/Map.css';
import { Node as NodeType, Edge as EdgeType, Position } from '../types/index';
import { useSelector, useDispatch } from '../hooks/hooks';
import {
  setSelectedNodeId,
  moveNode,
  setLastDeselectedNodeId,
  showToolbuttonAction,
  hideNodeSettings,
  setMapSize,
  setPopupPosition,
  markNodesAsOld,
  addNode,
  DELETE_ALL_NODES
} from '../redux/actions';
import { useQuery } from '@apollo/client';
import { GET_NODES_BY_PAGE_ID, UPDATE_NODE_POSITION_MUTATION } from '../../src/graphql/mutations';
import Loader from './Loader';



type MapProps = {
  email: string;
  pageId: string;
};

const Map: React.FC<MapProps> = ({ email, pageId }) => {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.nodes);
  const edges = useSelector((state: RootState) => state.edges);
  const selectedNodeId = useSelector((state: RootState) => state.selectedNodeId);
  const mapSize = useSelector((state: RootState) => state.map);
  const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });
  const [translate, setTranslate] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [viewport, setViewport] = useState<Position>({ x: window.innerWidth, y: window.innerHeight });
  const popupPosition = useSelector((state: RootState) => state.popupPosition);
  const [renderedEdges, setRenderedEdges] = useState<JSX.Element[] | null>(null);
  const [savePageData, { error: saveError }] = useMutation(SAVE_PAGE_DATA);
  const [updateNodePosition, { error: updateError }] = useMutation(UPDATE_NODE_POSITION_MUTATION);
  const [addedNodes, setAddedNodes] = useState<NodeType[]>([]);
  const { data, loading, error } = useQuery(GET_NODES_BY_PAGE_ID, {
    variables: { pageId: pageId },
    fetchPolicy: 'network-only'
  });


  const startDrag = (e: MouseEvent) => {
    setStartPos({ x: e.clientX, y: e.clientY });
    setMouseDown(true);
  };


  const moveDrag = (e: MouseEvent) => {
    if (mouseDown) {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      const newTranslate = {
        x: Math.max(Math.min(translate.x + dx, 0), viewport.x - mapSize.width),
        y: Math.max(Math.min(translate.y + dy, 0), viewport.y - mapSize.height),
      };
      setTranslate(newTranslate);
      dispatch(setPopupPosition(newTranslate));
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };


  const stopDrag = (e: MouseEvent) => {
    setMouseDown(false);
  };


  const [, drop] = useDrop({
    accept: `Node`,
    drop: (item: any, monitor: any) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      const newMapWidth = Math.max(left, mapSize.width);
      const newMapHeight = Math.max(top, mapSize.height);
      dispatch(moveNode(item.id, left, top, newMapWidth, newMapHeight));
      dispatch(setMapSize(newMapWidth, newMapHeight));
      dispatch(showToolbuttonAction(false));
      dispatch(setSelectedNodeId(item.id));
      updateNodePosition({
        variables: {
          nodeId: item.id,
          x: left,
          y: top
        }
      });
      return undefined;
    },
  });


  const handleDeselectNode = () => {
    dispatch(setLastDeselectedNodeId(selectedNodeId));
    dispatch(setSelectedNodeId(null));
    dispatch(showToolbuttonAction(false));
    dispatch(hideNodeSettings());
  }


  const renderEdges = (edges: EdgeType[], nodes: NodeType[], uniqueKey: string) => {
    return edges.map((edge, index) => {
      const fromNode = nodes.find(node => node.id.toString() === edge.source.nodeId);
      const toNode = nodes.find(node => node.id.toString() === edge.target.nodeId);
      if (!fromNode || !toNode) {
        return null;
      }
      return (
        <Edge key={`${uniqueKey}_${index}`}
          fromNode={fromNode}
          toNode={toNode}
        />
      );
    }).filter(edgeElement => edgeElement !== null) as JSX.Element[];
  }


  useEffect(() => {
    setRenderedEdges(renderEdges(edges, nodes, 'map_edges'));
  }, [edges, nodes]);

  function calculateInitialCenter(nodes: NodeType[]): Position {
    if (!Array.isArray(nodes) || nodes.length === 0) {
      return { x: 0, y: 0 };
    }
    const xPositions = nodes.map(node => node.left);
    const yPositions = nodes.map(node => node.top);
    const centerX = (Math.max(...xPositions) + Math.min(...xPositions)) / 2;
    const centerY = (Math.max(...yPositions) + Math.min(...yPositions)) / 2;
    return { x: -centerX, y: -centerY };
  }


  useEffect(() => {
    setTranslate(calculateInitialCenter(nodes));
  }, [nodes]);


  useEffect(() => {
    const handleResize = () => {
      setViewport({ x: window.innerWidth, y: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const newAddedNodes = nodes.filter(node => node.isNew);
    setAddedNodes(newAddedNodes);
  }, [nodes]);


  useEffect(() => {
    if (addedNodes.length > 0) {
      const sanitizedNodes = addedNodes.map((node: any) => {
        const { __typename, ...rest } = node;
        return rest;
      });

      savePageData({
        variables: {
          email: email,
          pageId: pageId,
          data: { nodes: sanitizedNodes },
        },
      })
        .then(() => {
          dispatch(markNodesAsOld());
        })
        .catch((err) => {
          console.error('Error saving page data:', err);
        });
    }
  }, [addedNodes, email, pageId]);


  useEffect(() => {
    if (!loading && data) {
      dispatch({ type: 'DELETE_ALL_NODES' });

      data.getNodesByPageId.forEach((node: NodeType) => {
        dispatch(addNode(node));
      });
    }

    if (error) {
      console.error("Error fetching nodes:", error);
    }
  }, [loading, data, error, pageId]);




  if (loading) {
    return <Loader />;
  }



  return (
    <div
      ref={drop}
      onMouseDown={startDrag}
      onMouseMove={moveDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onClick={handleDeselectNode}
      className="map"
      style={{
        transform: `translate(${translate.x}px, ${translate.y}px)`,
        width: `${mapSize.width}px`,
        height: `${mapSize.height}px`,
      }}
    >
      {Array.isArray(nodes) && nodes.map(node => (
        <Node
          key={node.id}
          node={node}
        />
      ))}
    </div>
  );
}

export default Map;
