import React, { createContext, useReducer, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Reducer Function
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    default:
      return state;
  }
}

// Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Log state changes
  useEffect(() => {
    console.log("Auth state changed:", state);
    
    // Persist authentication state to localStorage
    if (state.isAuthenticated && state.user) {
      localStorage.setItem("authState", JSON.stringify({
        user: state.user,
        isAuthenticated: true
      }));
    } else if (!state.isAuthenticated) {
      localStorage.removeItem("authState");
    }
  }, [state]);

  // Check if user is logged in on app load
  useEffect(() => {
    const checkAuth = () => {
      // First check for previously saved auth state
      const savedAuthState = localStorage.getItem("authState");
      
      if (savedAuthState) {
        const { user } = JSON.parse(savedAuthState);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });
        return;
      }
      
      // Fallback to check for remembered user
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const rememberedUser = localStorage.getItem("rememberedUser");

      if (rememberedUser) {
        const { email } = JSON.parse(rememberedUser);
        const user = users.find((u) => u.email === email);

        if (user) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: user,
          });
        }
      }
    };

    checkAuth();
  }, []);

  // Login Function
  const login = async (credentials) => {
    dispatch({ type: "LOGIN_REQUEST" });
  
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );
  
      if (!user) {
        throw new Error("Invalid email or password");
      }
  
      // Store remembered user if checkbox is checked
      if (credentials.rememberMe) {
        localStorage.setItem(
          "rememberedUser",
          JSON.stringify({ email: user.email })
        );
      } else {
        localStorage.removeItem("rememberedUser");
      }
  
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
  
      return user;
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.message,
      });
      throw error;
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("rememberedUser");
    localStorage.removeItem("authState");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};