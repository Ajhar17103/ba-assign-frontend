
import axiosInstance from '../../Services/Interceptor';
import { GET_HOTELS_REQUEST, GET_HOTELS_SUCCESS, GET_HOTELS_FAILURE } from './actionTypes';

export const getHotelsRequest = () => ({
  type: GET_HOTELS_REQUEST,
});

export const getHotelsSuccess = (data) => ({
  type: GET_HOTELS_SUCCESS,
  payload: data,
});

export const getHotelsFailure = (error) => ({
  type: GET_HOTELS_FAILURE,
  payload: error,
});

export const fetchHotels = (dynamicUrl) => {
  return (dispatch) => {
    dispatch(getHotelsRequest());
    axiosInstance
      .get(dynamicUrl)
      .then((res) => {
        dispatch(getHotelsSuccess(res?.data));
      })
      .catch((err) => {
        dispatch(getHotelsFailure(err.message));
      });
  };
};
