import React, { useContext } from 'react';
import { RootState } from '../redux/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { selectPolarNode, updateDraggedPosition, setResults, setCenterPolarNode, addPolarEdgeInfo, clearPolarEdgeInfo } from '../redux/actions';
import styles from '../styles/PolarNodePopup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import { calculatePolarCoordinates, getColumnNumber } from '../utils/polarCoordinates';
import GreenButton from './GreenButton';
import { ErrorContext } from '../contexts/ErrorContext';
import { NoResultContext } from '../contexts/NoResultContext';
import { GET_RELATED_NODES_QUERY } from '../graphql/mutations'
import Loader from './Loader';
import Image from 'next/image';

interface PolarNodePopupProps {
  hideDraggableComponents: Function;
  setShowEdges: Function;
}
const PolarNodePopup: React.FC<PolarNodePopupProps> = ({ hideDraggableComponents, setShowEdges }) => {
  const dispatch = useDispatch();
  const selectedPolarNodeId = useSelector((state: RootState) => state.selectedPolarNode);
  const centerPolarNode = useSelector((state: RootState) => state.centerPolarNode);
  const searchResults = useSelector((state: RootState) => state.searchResults);
  const centerPosition = useSelector((state: RootState) => state.searchBarPosition);
  const { showError } = useContext(ErrorContext);
  const { showNoResult } = useContext(NoResultContext);


  let selectedPolarNode = searchResults.find((node, index: number) => index === selectedPolarNodeId);


  if (!selectedPolarNode) {
    selectedPolarNode = centerPolarNode;
  }


  let labels, properties;


  if (selectedPolarNode) {
    labels = selectedPolarNode.startNode ? selectedPolarNode.startNode.labels : selectedPolarNode.labels;
    properties = selectedPolarNode.startNode ? selectedPolarNode.startNode.properties : selectedPolarNode.properties;
  }


  const nodeId = properties ? properties.esId : null;
  const { loading, error, data: relatedNodesData } = useQuery(GET_RELATED_NODES_QUERY, {
    variables: { esId: nodeId },
    skip: !nodeId,
  });


  if (!selectedPolarNode || !properties) return null;
  if (selectedPolarNodeId === null || !selectedPolarNode || !properties) return null;


  const { name, imagePath, description } = properties;


  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(selectPolarNode(null));
  };


  const handleVisualizeRelations = async (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(clearPolarEdgeInfo());
    try {
      if (!loading &&
        (!relatedNodesData ||
          !relatedNodesData.getRelatedNodes ||
          relatedNodesData.getRelatedNodes.length === 0)) {
        showNoResult("No related nodes were found for the selected node.");
        return;
      }
      hideDraggableComponents();
      dispatch(setCenterPolarNode(selectedPolarNode));
      setShowEdges(true)
      if (!relatedNodesData || error) {
        if (error) {
          showError("An error occurred while fetching related nodes.");
        }
        return;
      }
      const relatedNodes = relatedNodesData.getRelatedNodes;
      const endNode = relatedNodes.map(node => node.endNode);
      dispatch(setResults(endNode));
      relatedNodes.forEach(node => {
        dispatch(addPolarEdgeInfo(node.startNode, node.endNode, node.relationship));
      });
      relatedNodes.forEach((node, index) => {
        const column = getColumnNumber(index, relatedNodes.length);
        const { x, y } = calculatePolarCoordinates(center, index, relatedNodes.length, column);
        dispatch(updateDraggedPosition(index, x, y));
      });
      dispatch(updateDraggedPosition(selectedPolarNodeId, centerPosition.x, centerPosition.y));
      setShowEdges(true);
    } catch (error) {
      console.error("Error in handleVisualizeRelations:", error);
    }
  };


  return (
    <div className={styles.popupContainer}>
      {loading && <Loader />}
      <div className={styles.closeButton} onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </div>
      <div className={styles.titleSection}>
        {imagePath && <Image src={`/${imagePath}`} alt={name} className={styles.popupImage} width="100" height="100" />}
        <h2 className={styles.popupTitle}>{name}</h2>
      </div>
      <p className={styles.popupLabel}>
        <strong>Label</strong>
        <span className={styles.labelValue}>{labels.join(', ')}</span>
      </p>
      <div className={styles.popupDescription}>
        <h3 className={styles.h3Description}>Description</h3>
        <span className={styles.descriptionValue}>{description}</span>
      </div>
      <GreenButton
        className={styles.visualizeRelationsButton}
        onClick={handleVisualizeRelations}
        onMouseDown={(e) => e.stopPropagation()}
        text="Visualize Relations"
      />
    </div>
  );


};

export default PolarNodePopup;
