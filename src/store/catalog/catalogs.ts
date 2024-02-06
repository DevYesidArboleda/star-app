import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SimpleCatalog } from "../../../interfaces";

interface CatalogState {
  [key: string]: SimpleCatalog;
}

const initialState: CatalogState = {
  //"101624": { id: "101624", name: "Labial Permanente" },
};

const catalogsSlices = createSlice({
  name: "Catalogo",
  initialState,
  reducers: {
    toggleCatalog(state, action: PayloadAction<SimpleCatalog>) {
      const catalog = action.payload;
      const { id } = catalog;

      if (!!state[id]) {
        delete state[id];
        // return;
      } else {
        state[id] = catalog;
      }
    },
  },
});

export const { toggleCatalog } = catalogsSlices.actions;

export default catalogsSlices.reducer;
