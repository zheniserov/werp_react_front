import axios from 'axios';
import { ROOT_URL } from '../utils/constants';
import { handleError } from '../general/notification/notification_action';
import { modifyLoader } from '../general/loader/loader_action';

export const FETCH_DYNOBJ_HR = 'FETCH_DYNOBJ_HR';
export const CHANGE_DYNOBJ_HR = 'CHANGE_DYNOBJ_HR';
export const CLEAR_DYNOBJ_HR = 'CLEAR_DYNOBJ_HR';

export function changeDynObjHr(a_obj) {
  const obj = {
    type: CHANGE_DYNOBJ_HR,
    data: a_obj,
  };
  return obj;
}

export function clearDynObjHr() {
  const obj = {
    type: CLEAR_DYNOBJ_HR,
  };
  return obj;
}

export function fetchDynamicFAGM(url, params) {
  let fullUrl = `${ROOT_URL}` + url;
  return function(dispatch) {
    dispatch(modifyLoader(true));
    axios
      .get(fullUrl, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          ...params,
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_DYNOBJ_HR,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
        dispatch(modifyLoader(false));
      });
  };
}
