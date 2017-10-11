import axios from 'axios';
import {ROOT_URL} from '../../../utils/constants';


export const FETCH_USERS = 'FETCH_USERS';
export const FIND_USERS = 'FIND_USERS';
export const FETCH_USER_BRANCHES = 'FETCH_USER_BRANCHES';

export function fetchUsers() {

    return function(dispatch) {
        axios.get(`${ROOT_URL}/dit/userBranch/FETCH_USERS`)
            .then(response =>{                            
                dispatch({
                    type: FETCH_USERS,
                    payload: response 
                });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_USERS,
                    payload: null 
                });  
                     
            });
    }    
}



export function findUsers(userList,userSearchTerm) {

    return function(dispatch) {
        axios.post(`${ROOT_URL}/dit/userBranch/FIND_USERS`,
        {userList,userSearchTerm}
    
    ).then(response =>{                            
                dispatch({
                    type: FIND_USERS,
                    payload: response 
                });
            })
            .catch(error => {
                dispatch({
                    type: FIND_USERS,
                    payload: null 
                });  
                     
            });
    }    
}

export function fethcUserBranches(selectedUserId) {
    
        return function(dispatch) {
            axios.post(`${ROOT_URL}/dit/userBranch/FETCH_USER_BRANCHES`,
            {selectedUserId}
        
        ).then(response =>{                            
                    dispatch({
                        type: FETCH_USER_BRANCHES,
                        payload: response 
                    });
                })
                .catch(error => {
                    dispatch({
                        type: FETCH_USER_BRANCHES,
                        payload: null 
                    });  
                         
                });
        }    
    }
