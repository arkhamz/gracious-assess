import { useReducer } from "react";

export default function usePageReducer(initialState = { currentPage: 1 }) {
  function pageReducer(state, action) {
    switch (action.type) {
      case "increment":
        return { currentPage: state.currentPage + 1 };
      case "decrement":
        return { currentPage: state.currentPage - 1 };
      default:
        return state;
    }
  }

  return useReducer(pageReducer, initialState);
}
