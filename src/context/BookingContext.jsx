import React,{ createContext, useReducer } from 'react';

// Create context
export const BookingContext = createContext();

// Initial state
const initialState = {
  bookingData: {
    packageId: null,
    travelDate: null,
    adults: 1,
    children: 0,
    passengers: [],
    totalAmount: 0,
  },
  currentStep: 1,
  loading: false,
  error: null
};

// Reducer function
function bookingReducer(state, action) {
  switch (action.type) {
    case 'SET_PACKAGE':
      return {
        ...state,
        bookingData: {
          ...state.bookingData,
          packageId: action.payload,
          passengers: []
        },
        currentStep: 1
      };
    case 'UPDATE_BASIC_DETAILS':
      return {
        ...state,
        bookingData: {
          ...state.bookingData,
          ...action.payload,
          passengers: Array(action.payload.adults + action.payload.children).fill({
            name: '',
            age: '',
            gender: ''
          })
        }
      };
    case 'UPDATE_PASSENGER':
      const updatedPassengers = [...state.bookingData.passengers];
      updatedPassengers[action.payload.index] = action.payload.data;
      
      return {
        ...state,
        bookingData: {
          ...state.bookingData,
          passengers: updatedPassengers
        }
      };
    case 'SET_TOTAL_AMOUNT':
      return {
        ...state,
        bookingData: {
          ...state.bookingData,
          totalAmount: action.payload
        }
      };
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload
      };
    case 'RESET_BOOKING':
      return initialState;
    default:
      return state;
  }
}

// Provider component
export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Set package
  const setPackage = (packageId) => {
    dispatch({
      type: 'SET_PACKAGE',
      payload: packageId
    });
  };

  // Update basic details
  const updateBasicDetails = (data) => {
    dispatch({
      type: 'UPDATE_BASIC_DETAILS',
      payload: data
    });
  };

  // Update passenger details
  const updatePassenger = (index, data) => {
    dispatch({
      type: 'UPDATE_PASSENGER',
      payload: { index, data }
    });
  };

  // Set total amount
  const setTotalAmount = (amount) => {
    dispatch({
      type: 'SET_TOTAL_AMOUNT',
      payload: amount
    });
  };

  // Set current step
  const setStep = (step) => {
    dispatch({
      type: 'SET_STEP',
      payload: step
    });
  };

  // Reset booking
  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
  };

  return (
    <BookingContext.Provider
      value={{
        ...state,
        setPackage,
        updateBasicDetails,
        updatePassenger,
        setTotalAmount,
        setStep,
        resetBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};