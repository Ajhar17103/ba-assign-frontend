// reducer.js
import { GET_HOTELS_REQUEST, GET_HOTELS_SUCCESS, GET_HOTELS_FAILURE } from './actionTypes';

const initialState = {
  hotelList: [],
  isLoading: false,
  error: null,
};

const hotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOTELS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_HOTELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hotelList: action.payload,
      };
    case GET_HOTELS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default hotelReducer;
