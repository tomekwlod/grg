// reducer - it is basically how we specify the application state changes
// in response to certain actions to our store (to our context)

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
    case "CREATE_OFFICE":
      return {
        ...state,
        office: action.payload,
        error: "",
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
