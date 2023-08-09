// reducers/favoritesReducer.ts
import { createReducer } from "@reduxjs/toolkit";
import { addToFavorites, removeFromFavorites } from "../actions/favoriteNode";

type FavoriteState = Record<string, Record<string, boolean>>;

const initialState: FavoriteState = {};

export const favoritesReducer = createReducer(initialState, (builder) => {
  builder.addCase(addToFavorites, (state, action) => {
    const { email, nodeId } = action.payload;

    // If the user's favorites have not been initialized, initialize it
    if (!state[email]) {
      state[email] = {};
    }

    // Add the node to favorites
    state[email][nodeId] = true;
  });

  builder.addCase(removeFromFavorites, (state, action) => {
    const { email, nodeId } = action.payload;

    if (state[email] && state[email][nodeId]) {
      // Remove the node from favorites
      delete state[email][nodeId];
    }
  });
});
