import { createAction } from "@reduxjs/toolkit";

export const addToFavorites = createAction<{ email: string, nodeId: string }>("addToFavorites");
export const removeFromFavorites = createAction<{ email: string, nodeId: string }>("removeFromFavorites");
