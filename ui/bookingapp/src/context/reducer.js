// reducer - it is basically how we specify the application state changes
// in response to certain actions to our store (to our context)

import {
  USER_SET,
  OFFICES_LIST,
  OFFICE_CREATE,
  OFFICES_LIST_ERROR,
  RESOURCE_CREATE,
  RESOURCES_LIST,
  RESOURCES_LIST_ERROR,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case USER_SET:
      return {
        ...state,
        user: action.payload,
      };
    case OFFICE_CREATE:
      return {
        ...state,
        offices: [...state.offices, action.payload],
        error: "",
      };
    case OFFICES_LIST:
      return {
        ...state,
        offices: action.payload,
        error: "",
      };
    case OFFICES_LIST_ERROR:
      return {
        ...state,
        offices: [],
        error: action.payload,
      };
    case "OFFICE_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case RESOURCE_CREATE:
      return {
        ...state,
        resources: [...state.resources, action.payload],
        error: "",
      };
    case RESOURCES_LIST:
      return {
        ...state,
        resources: action.payload,
        error: "",
      };
    case RESOURCES_LIST_ERROR:
      return {
        ...state,
        resources: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
