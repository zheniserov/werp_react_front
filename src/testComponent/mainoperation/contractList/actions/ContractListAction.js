/* jshint esversion: 6 */
import axios from 'axios';
import { ROOT_URL } from '../../../../utils/constants';

export const CONTRACT_LIST_DIRECTORIES = 'contract_list_directories';
export const CLEAR_CONSTRACT_LIST_STORE = 'clear_contract_list_store';
export const FOUND_CONTRACTS = 'found_contracts';

// function getDirectory(name) {
//   return axios.get(`${ROOT_URL}/api/reference/${name}`, {
//     headers: { authorization: localStorage.getItem('token') },
//   });
// }

export function getDirectories() {
  return function (dispatch) {
    const directories = {      
      stateOptions: [{ key: 1, value: 1, text: 'State1' },
      { key: 2, value: 2, text: 'State2' },
      { key: 3, value: 3, text: 'State3' }],
      // result: makeData();
    };
    dispatch({
      type: CONTRACT_LIST_DIRECTORIES,
      payload: directories,
    });
    // axios.all([getDirectory('countries'), getDirectory('companies')])
    //   .then(axios.spread(({ data: countryList }, { data: companyList }) => {
    //     const newCompanyOptions = companyList.map(item => ({
    //       key: item.id,
    //       value: item.id,
    //       text: item.name,
    //     }));
    //     const directories = {
    //       companyOptions: newCompanyOptions,
    //       operatorOptions: [{ key: 0, value: 0, text: 'Nagima' },
    //       { key: 1, value: 1, text: 'Raushan' },
    //       { key: 2, value: 2, text: 'Assel' }],
    //       branchOptions: [{ key: 1, value: 1, text: 'Branch1' },
    //       { key: 2, value: 2, text: 'Branch2' },
    //       { key: 3, value: 3, text: 'Branch3' }],
    //       stateOptions: [{ key: 1, value: 1, text: 'State1' },
    //       { key: 2, value: 2, text: 'State2' },
    //       { key: 3, value: 3, text: 'State3' }],
    //       // result: makeData();
    //     };
    //     dispatch({
    //       type: CONTRACT_LIST_DIRECTORIES,
    //       payload: directories,
    //     });
    //   }))
    //   .catch((err) => {
    //     console.log('Error in ContractListPage', err);
    //   });
  };
}

export function clearContractListStore() {
  return function (dispatch) {
    dispatch({ type: CLEAR_CONSTRACT_LIST_STORE });
  };
}

export function searchContracts(params) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/api/call-center/out-calls?${params}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(({ data }) => {
        //console.log(data);
        dispatch({
          type: FOUND_CONTRACTS,
          payload: data,
        });
      })
      .catch(err => console.log('ERROR in contract list search', err));
  };
}