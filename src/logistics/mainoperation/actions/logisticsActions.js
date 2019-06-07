import axios from 'axios';
import { ROOT_URL } from '../../../utils/constants';
import { modifyLoader } from '../../../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';

import browserHistory from '../../../utils/history';
import {
  LOG_WERKS_REQUEST_LIST_FETCHED,
  LOG_WERKS_REQUEST_BLANKED,
  LOG_MATNRS_FETCHED,
  LOG_MATNRS_LOADING,
  LOG_WERKS_REQUEST_ITEM_BLANKED,
  LOG_WERKS_REQUEST_FETCHED,
  LOG_INVOICES_FETCHED,
  LOG_INVOICE_BLANKED,
  LOG_INVOICE_FETCHED,
} from './logisticsActionTypes';
import { doPut, doGet, doPost } from '../../../utils/apiActions';
import { getUriByDoctype } from '../../logUtil';

export function fetchWerksRequestsIn(params) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/logistics/werks-request/in`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: params,
      })
      .then(({ data }) => {
        dispatch({
          type: LOG_WERKS_REQUEST_LIST_FETCHED,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function blankWerksRequest() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/logistics/werks-request/blank`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: LOG_WERKS_REQUEST_BLANKED,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchWerksRequest(id) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/logistics/werks-request/` + id, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: LOG_WERKS_REQUEST_FETCHED,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function blankWerksRequestItem(matnrId) {
  return dispatch => {
    return axios.get(
      `${ROOT_URL}/api/logistics/werks-request/blank-item/` + matnrId,
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      },
    );
  };
}

export function createWerksRequest(o) {
  return dispatch => {
    return axios.post(`${ROOT_URL}/api/logistics/werks-request`, o, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
  };
}

export function fetchMatnrs(params) {
  return function(dispatch) {
    dispatch(setMatnrListLoading(true));
    axios
      .get(`${ROOT_URL}/api/reference/matnrs`, {
        params: params,
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch(setMatnrListLoading(false));
        dispatch({
          type: LOG_MATNRS_FETCHED,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(setMatnrListLoading(false));
        handleError(error, dispatch);
      });
  };
}

export function setMatnrListLoading(flag) {
  return {
    type: LOG_MATNRS_LOADING,
    payload: flag,
  };
}

export function doAction(docId) {
  doPut('api/logistics/invoices/do-action/' + docId)
    .then(({ data }) => {})
    .catch(e => {});
}

export function fetchInvoices(params = {}) {
  return function(dispatch) {
    dispatch(setMatnrListLoading(true));
    doGet('logistics/invoices', params)
      .then(({ data }) => {
        dispatch(setMatnrListLoading(false));
        dispatch({
          type: LOG_INVOICES_FETCHED,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(setMatnrListLoading(false));
        handleError(error, dispatch);
      });
  };
}

export function blankInvoice(doctype) {
  return function(dispatch) {
    doGet('logistics/invoices/blank', { doctype: doctype })
      .then(({ data }) => {
        dispatch({
          type: LOG_INVOICE_BLANKED,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchInvoice(id, params = {}) {
  return function(dispatch) {
    doGet('logistics/invoices/' + id, params)
      .then(({ data }) => {
        dispatch({
          type: LOG_INVOICE_FETCHED,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function saveInvoice(invoice) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    const uri = 'logistics/invoices';
    let prom = invoice.new ? doPost(uri, invoice) : doPut(uri, invoice);
    prom
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        browserHistory.push(
          `/logistics/invoices/` +
            getUriByDoctype(invoice.doctype) +
            `/view/${data.id}`,
        );
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        dispatch(notify('error', error.response.data.message, 'Ошибка'));
      });
  };
}
