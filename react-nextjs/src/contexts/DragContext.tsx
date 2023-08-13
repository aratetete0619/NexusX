import React, { Dispatch, SetStateAction } from 'react';

interface DragContextInterface {
  isDragging: boolean;
  setDragging: Dispatch<SetStateAction<boolean>>;
}

export const DragContext = React.createContext<DragContextInterface>({
  isDragging: false,
  setDragging: () => { },
});
