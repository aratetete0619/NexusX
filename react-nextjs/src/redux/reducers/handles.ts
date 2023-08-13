import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type HandleState = {
  [nodeId: string]: {
    [position: string]: {
      x: number;
      y: number;
    };
  };
};

const initialState: HandleState = {};

const handlesSlice = createSlice({
  name: 'handles',
  initialState,
  reducers: {
    setHandlePosition: (
      state,
      action: PayloadAction<{ nodeId: string; position: string; x: number; y: number }>
    ) => {
      const { nodeId, position, x, y } = action.payload;
      if (!state[nodeId]) {
        state[nodeId] = {};
      }
      state[nodeId][position] = { x, y };
    },
  },
});

export const { setHandlePosition } = handlesSlice.actions;

export default handlesSlice.reducer;
