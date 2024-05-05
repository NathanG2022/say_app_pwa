import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    return error;
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    // dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    return error;
  }
};

export const verify = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.verify(formData);

    dispatch({ type: AUTH, data });

    router.push('/');

    //return api.getVerify(id);
  } catch (error) {
    return error;
  }
}
