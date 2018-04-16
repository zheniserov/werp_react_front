import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { modifyLoader } from '../../../../general/loader/loader_action';
import {handleError} from '../../../../general/notification/notification_action'
import browserHistory from '../../../../utils/history';

export const HR_PYRAMID_FETCH_BUKRS_TREE = 'HR_PYRAMID_FETCH_BUKRS_TREE'
export const HR_PYRAMID_TREE_CHANGED = 'HR_PYRAMID_TREE_CHANGED'
export const HR_PYRAMID_TREE_DELETED = 'HR_PYRAMID_TREE_DELETED'
export const HR_PYRAMID_FORM_MODAL_TOGGLE = 'HR_PYRAMID_FORM_MODAL_TOGGLE'
export const HR_PYRAMID_BLANK_ITEM = 'HR_PYRAMID_BLANK_ITEM'

export function fetchBukrsPyramidsTree(bukrs){
    return function(dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/hr/pyramid/tree`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{bukrs:bukrs}
        })
            .then(({data}) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type:HR_PYRAMID_FETCH_BUKRS_TREE,
                    payload: data
                })
            }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}

export function pyramidTreeChanged(treeData){
    return {
        type: HR_PYRAMID_TREE_CHANGED,
        payload: treeData
    }
}

export function deletePyramid(id){
    return function(dispatch){
        dispatch(modifyLoader(true));
        axios.delete(`${ROOT_URL}/api/hr/pyramid/` + id,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(() => {
                dispatch(modifyLoader(false));
                dispatch({
                    type:HR_PYRAMID_TREE_DELETED,
                    payload: id
                })
            }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}

export function blankItem(parentId){
    return function(dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/hr/pyramid/blank/` + parentId,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(({data}) => {
                dispatch(modifyLoader(false))
                console.log(data)
                dispatch({
                    type:HR_PYRAMID_BLANK_ITEM,
                    payload: data
                })
            }).catch((error) => {
                handleError(error,dispatch)
        })
    }
}

export function toggleFormModal(flag){
    return {
        type: HR_PYRAMID_FORM_MODAL_TOGGLE,
        payload: flag
    }
}