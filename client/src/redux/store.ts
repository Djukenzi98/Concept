import { configureStore } from "@reduxjs/toolkit";
import conceptsReducer from "./Concept/conceptsSlice";
import usersReducer from "./User/usersSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    concepts: conceptsReducer,
    users: usersReducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
