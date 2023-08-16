import React, { useEffect, useState, useContext } from 'react';
import { RootState } from '../redux/reducers';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { addToFavorites, removeFromFavorites } from '../redux/actions/favoriteNode';
import styles from '../styles/PolarNode.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { parseCookies } from 'nookies';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../graphql/mutations';
import { ErrorContext } from '../contexts/ErrorContext';
import { ResultType } from '../types'

interface PolarNodeProps {
  id: number;
  onSelect: () => void;
  result: ResultType;
  style: { x: number, y: number };
  updatePosition: (x: number, y: number) => void;
}

const PolarNode: React.FC<PolarNodeProps> = ({ id, onSelect, result, style = { x: 0, y: 0 }, updatePosition }) => {
  const MAX_CHAR_COUNT = 25;
  const selectedNodeId = useSelector((state: RootState) => state.selectedPolarNode);
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const email = cookies.email;
  const errorContext = useContext(ErrorContext);
  if (!errorContext) {
    throw new Error('ErrorContext not provided');
  }
  const { showError } = errorContext;

  const [isFavorited, setIsFavorited] = useState(false);

  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(REMOVE_FAVORITE);


  const [{ isDragging }, drag, preview] = useDrag({
    type: 'POLAR_NODE',
    item: () => ({ id, x: style.x, y: style.y }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta && style && style.x !== undefined && style.y !== undefined) {
        updatePosition(style.x + delta.x, style.y + delta.y);
      }
    },
  });

  const handleDoubleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (!isFavorited) {
        setIsFavorited(true);
        dispatch(addToFavorites({ email, nodeId: esId }));
        await addFavorite({ variables: { email, nodeId: esId } });
      }
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError("An unexpected error occurred.");
      }
    }
  };


  const handleFavoriteIconClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isFavorited) {
        setIsFavorited(false);
        dispatch(removeFromFavorites({ email: email, nodeId: esId }));
        await removeFavorite({ variables: { email, nodeId: esId } });
      }
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  if (!result) return null;
  if (!result.startNode && !result.properties) {
    console.warn("Both startNode and properties are missing or null.");
    return;
  }

  const properties = result.startNode ? result.startNode.properties : result.properties;

  if (!properties) {
    return null;
  }

  const { name, imagePath } = properties;
  const esId = properties.esId;
  let displayName = name;
  if (name.length > MAX_CHAR_COUNT) {
    displayName = `${name.substring(0, MAX_CHAR_COUNT)}...`;
  }


  return (
    <div ref={drag} style={{ position: 'absolute', left: style.x, top: style.y }}>
      <div
        className={`${styles.circle} ${id === selectedNodeId ? styles.selected : ''} ${imagePath ? styles.withImage : ''}`}
        style={{
          backgroundImage: imagePath ? `url(/${imagePath})` : 'none',
        }}
        onClick={onSelect}
        onDoubleClick={handleDoubleClick}
      >
        {!imagePath && <div className={styles.content}>
          <span className={styles.nodeName}>{displayName}</span>
          {isFavorited && <FontAwesomeIcon
            icon={faHeart}
            onClick={handleFavoriteIconClick}
            className={isFavorited ? styles.favoriteIcon : styles.notFavoriteIcon}
          />}
        </div>}
        <AnimatePresence>
          {isFavorited && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 1 }}
              style={{ position: 'absolute', top: '40%', left: '40%', transform: 'translate(-50%, -50%)' }}
            >
              <FontAwesomeIcon icon={faHeart} size="3x" color="red" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {imagePath && <div className={styles.contentBelow}>
        <span className={styles.nodeName}>{name}</span>
        {isFavorited &&
          <div onClick={handleFavoriteIconClick} className={styles.favoriteIconContainer}>
            <FontAwesomeIcon
              icon={faHeart}
              className={isFavorited ? styles.favoriteIcon : styles.notFavoriteIcon}
            />
          </div>
        }
      </div>}
    </div>
  );
};

export default PolarNode;
