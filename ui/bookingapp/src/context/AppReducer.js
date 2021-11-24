// reducer - it is basically how we specify the application state changes
// in response to certain actions to our store (to our context)

// office
export const OFFICE_CREATE = "OFFICE_CREATE";
export const OFFICES_LIST = "OFFICES_LIST";
export const OFFICES_LIST_ERROR = "OFFICES_LIST_ERROR";

const AppReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        error: "",
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        token: "",
        error: action.payload,
        isAuthenticated: false,
      };
    case OFFICE_CREATE:
      return {
        ...state,
        office: action.payload,
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
    default:
      return state;
  }
};

export default AppReducer;
