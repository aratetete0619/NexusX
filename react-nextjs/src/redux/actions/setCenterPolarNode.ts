import { CENTER_POLAR_NODE } from './actionTypes'
import { Neo4jData } from '../../types/index'

export const setCenterPolarNode = (polarNode: Neo4jData) => ({
  type: CENTER_POLAR_NODE,
  payload: polarNode,
});
