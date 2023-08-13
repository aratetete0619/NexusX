import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [],
};

const nodeSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
  },
});

export const { setNodes } = nodeSlice.actions;

export default nodeSlice.reducer;
