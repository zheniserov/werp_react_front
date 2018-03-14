import axios from 'axios';
import {ROOT_URL} from '../../utils/constants';

export const F4_FETCH_MATNR_LIST = 'F4_FETCH_MATNR_LIST';
export const F4_CLEAR_MATNR_LIST = 'F4_CLEAR_MATNR_LIST';
export const F4_FETCH_POSITION_LIST = 'F4_FETCH_POSITION_LIST';
export const F4_CLEAR_POSITION_LIST = 'F4_CLEAR_POSITION_LIST';
export const F4_FETCH_CURRENCY_LIST = 'F4_FETCH_CURRENCY_LIST';
export const F4_CLEAR_CURRENCY_LIST = 'F4_CLEAR_CURRENCY_LIST';
export const F4_FETCH_BONUSTYPE_LIST = 'F4_FETCH_BONUSTYPE_LIST';
export const F4_CLEAR_BONUSTYPE_LIST = 'F4_CLEAR_BONUSTYPE_LIST';

export const F4_FETCH_COUNTRY_LIST = 'F4_FETCH_COUNTRY_LIST';
export const F4_CLEAR_COUNTRY_LIST = 'F4_CLEAR_COUNTRY_LIST';

//Районы в городе
export const F4_FETCH_CITYREG_LIST = 'F4_FETCH_CITYREG_LIST';
export const F4_CLEAR_CITYREG_LIST = 'F4_CLEAR_CITYREG_LIST';

//Область
export const F4_FETCH_STATE_LIST = 'F4_FETCH_STATE_LIST';
export const F4_CLEAR_STATE_LIST = 'F4_CLEAR_STATE_LIST';

//Города
export const F4_FETCH_CITY_LIST = 'F4_FETCH_CITY_LIST';
export const F4_CLEAR_CITY_LIST = 'F4_CLEAR_CITY_LIST';

export function f4FetchCountryList(){
    return function(dispatch) {
        axios.get(`${ROOT_URL}/api/reference/countries`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
                dispatch({
                    type: F4_FETCH_COUNTRY_LIST,
                    countryList:data
                });
            })
            .catch(error => {

            });
    }
}

export function f4FetchStateList(){
    return function(dispatch) {
        axios.get(`${ROOT_URL}/api/reference/states`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch({
                type: F4_FETCH_STATE_LIST,
                stateList:data
            });
        })
        .catch(error => {

        });
    }
}

export function f4FetchCityList(){
    return function(dispatch) {
        axios.get(`${ROOT_URL}/api/reference/cities`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch({
                type: F4_FETCH_CITY_LIST,
                cityList:data
            });
        })
        .catch(error => {

        });
    }
}

export function f4FetchCityregList(){
    return function(dispatch) {
        axios.get(`${ROOT_URL}/api/reference/regions`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch({
                type: F4_FETCH_CITYREG_LIST,
                cityregList:data
            });
        })
            .catch(error => {

            });
    }
}

export function f4FetchMatnrList(trans) {

    return function(dispatch) {

        axios.get(`${ROOT_URL}/api/reference/matnrList`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                trans:trans
            }

            
        })
        .then(({data}) => {
            dispatch({
                type: F4_FETCH_MATNR_LIST,
                matnrList:data
            });
    
        })
        .catch(error => {
            console.log(error);              
                 
        });
    }    
}

export function f4ClearMatnrList() {
    const obj = {
        type: F4_CLEAR_MATNR_LIST
    };
    return obj;
}

export function f4FetchPositionList(trans) {

    return function(dispatch) {

        axios.get(`${ROOT_URL}/api/reference/positionList`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                trans:trans
            }

            
        })
        .then(({data}) => {
            dispatch({
                type: F4_FETCH_POSITION_LIST,
                positionList:data
            });
    
        })
        .catch(error => {
            console.log(error);              
                 
        });
    }    
}


export function f4ClearPositionList() {
    const obj = {
        type: F4_CLEAR_POSITION_LIST
    };
    return obj;
}

export function f4FetchCurrencyList(trans) {

    return function(dispatch) {

        axios.get(`${ROOT_URL}/api/reference/currencyList`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                trans:trans
            }

            
        })
        .then(({data}) => {
            dispatch({
                type: F4_FETCH_CURRENCY_LIST,
                currencyList:data
            });
    
        })
        .catch(error => {
            console.log(error);              
                 
        });
    }    
}


export function f4ClearCurrencyList() {
    const obj = {
        type: F4_CLEAR_CURRENCY_LIST
    };
    return obj;
}

export function f4FetchBonusTypeList(trans) {

    return function(dispatch) {

        axios.get(`${ROOT_URL}/api/reference/bonusTypeList`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                trans:trans
            }

            
        })
        .then(({data}) => {
            dispatch({
                type: F4_FETCH_BONUSTYPE_LIST,
                bonusTypeList:data
            });
    
        })
        .catch(error => {
            console.log(error);              
                 
        });
    }    
}


export function f4ClearBonusTypeList() {
    const obj = {
        type: F4_CLEAR_BONUSTYPE_LIST
    };
    return obj;
}

