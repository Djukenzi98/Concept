import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Concept from "../../types/Concept";

type ConceptsState = {
  conceptList: Concept[];
};

const initialState: ConceptsState = {
  conceptList: [],
};

// FETCH
export const fetchConcepts = createAsyncThunk(
  "concept/fetchConcepts",
  async (thunkAPI) => {
    const response = await fetch("http://localhost:3001/concepts", {
      method: "GET",
    });

    const data = response.json();
    return data;
  }
);

// ADD
export const saveConcept = createAsyncThunk(
  "concept/saveConcept",
  async (concept: Concept, thunkAPI) => {
    const response = await fetch("http://localhost:3001/concepts/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: concept.title,
        description: concept.description,
        category: concept.category,
      }),
    });

    const data = await response.json();
    return data;
  }
);

// DELETE
export const deleteConcept = createAsyncThunk(
  "concept/deleteConcept",
  async (concept: Concept, thunkAPI) => {
    const response = await fetch(
      `http://localhost:3001/concepts/delete/${concept._id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    return data;
  }
);

// EDIT
export const updateConcept = createAsyncThunk(
  "concept/updateConcept",
  async (concept: Concept, thunkAPI) => {
    const res = await fetch("http://localhost:3001/concepts/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: concept._id,
        title: concept.title,
        description: concept.description,
      }),
    });

    const data = await res.json();
    return data;
  }
);

const conceptsSlice = createSlice({
  name: "conceptsSlice",
  initialState,
  reducers: {
    // addConcept(state: ConceptsState, action: PayloadAction<Concept>) {
    //   state.conceptList.push({
    //     _id: action.payload._id,
    //     title: action.payload.title,
    //     description: action.payload.description,
    //     example: action.payload.example,
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConcepts.fulfilled, (state, action) => {
      state.conceptList = action.payload;
    });
    builder.addCase(saveConcept.fulfilled, (state, action) => {
      state.conceptList.push(action.payload);
    });
    builder.addCase(deleteConcept.fulfilled, (state, action) => {
      state.conceptList = state.conceptList.filter(
        (element) => element._id !== action.payload._id
      );
    });
    builder.addCase(updateConcept.fulfilled, (state, action) => {
      const index = state.conceptList.findIndex(
        (x) => x._id === action.payload._id
      );
      state.conceptList[index] = { ...action.payload };
    });
  },
});

// export const { addConcept } = conceptsSlice.actions;
export default conceptsSlice.reducer;
