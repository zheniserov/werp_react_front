import axios from 'axios';
import browserHistory from '../../utils/history';
import { ROOT_URL } from '../../utils/constants';
import { resetLocalStorage } from '../../utils/helpers';
import {
  AUTH_USER,
  AUTH_ERROR,
  FETCH_USERS,
  USERS_ERROR,
  UNAUTH_USER,
} from '../types';
import {
  setAuthorizationHeader,
  setContentLanguageHeader,
} from '../../utils/setHeaders';

export function usersError(error) {
  return {
    type: USERS_ERROR,
    payload: error,
  };
}

export function authUser(payload) {
  return dispatch => {
    dispatch({
      type: AUTH_USER,
      payload,
    });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signinUser({ username, password }, language) {
  return dispatch => {
    // Submit username/password to the server
    axios
      .post(`${ROOT_URL}/signin`, { username, password, language })
      .then(response => {
        // If request is good...
        // - save the JWT token
        const { token, userId } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('language', language);
        localStorage.setItem(
          'errorTableString',
          JSON.stringify(response.data.errorTable),
        );
        if (
          response.data.internalNumber &&
          response.data.internalNumber.length > 0
        ) {
          localStorage.setItem('internalNumber', response.data.internalNumber);
        } else {
          localStorage.removeItem('internalNumber');
        }

        // setAuthorizationHeader(token);
        // setContentLanguageHeader(language);
        // - update state to indicate user is authenticated
        dispatch(authUser({ username, userId }));
        // - redirect to the route '/'
        const path = localStorage.getItem('currentPathName');
        if (path) {
          browserHistory.push(path);
        } else {
          browserHistory.push('/');
        }
      })
      .catch(error => {
        // If request is bad...
        // - Show an error to the user
        if (error.response) {
          dispatch(authError(error.response.data.message));
        } else if (error.stack) {
          Promise.resolve({ error }).then(response =>
            dispatch(authError(response.error.message)),
          );
        }
      });
  };
}

export function signoutUser() {
  // setAuthorizationHeader();
  resetLocalStorage();
  localStorage.removeItem('currentPathName');
  localStorage.removeItem('breadcrumb');
  browserHistory.push('/');
  return dispatch => {
    dispatch({
      type: UNAUTH_USER,
    });
  };
}

export function fetchUsers() {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/users`)
      .then(response => {
        dispatch({
          type: FETCH_USERS,
          payload: response,
        });
      })
      .catch(error => {
        const msg = "Can't fetch all users. ";
        if (error.response) {
          dispatch(usersError(msg + error.response.data.message));
        } else {
          Promise.resolve({ error }).then(response =>
            dispatch(usersError(msg + response.error.message)),
          );
        }
      });
  };
}
