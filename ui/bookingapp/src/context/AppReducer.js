// reducer - it is basically how we specify the application state changes
// in response to certain actions to our store (to our context)

export const actions = {
  OFFICES_LIST: "list",
  OFFICES_LIST_ERROR: "list_error",
  OFFICE_CREATE: "create",
};

const appReducer = (state, action) => {
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
    case actions.OFFICE_CREATE:
      return {
        ...state,
        office: action.payload,
        error: "",
      };
    case actions.OFFICES_LIST:
      return {
        ...state,
        offices: action.payload,
        error: "",
      };
    case actions.OFFICES_LIST_ERROR:
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

export default appReducer;
