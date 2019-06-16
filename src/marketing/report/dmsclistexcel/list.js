import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import { LinkToMmcv, LinkToCustomerHrc03 } from '../../../utils/outlink';

export default function List(props) {
  const { contlist, messages } = props;
  const columns = [
    {
      Header: messages['L__BRANCH'],
      id: 'branchName',
      accessor: d => d.branchName,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['branchName'] }),
      filterAll: true,
      width: 90,
      minWidth: 90,
      maxWidth: 100,
    },
    {
      Header: messages['L__CONTRACT_NUMBER'],
      accessor: 'contract_number',
      Cell: obj => (
        <span>
          {obj.original.contract_number && (
            <LinkToMmcv contract_number={obj.original.contract_number} />
          )}
        </span>
      ),
      width: 70,
      minWidth: 70,
      maxWidth: 90,
    },
    {
      Header: messages['L__CONTRACT_DATE'],
      accessor: 'contract_date',
      minWidth: 90,
      maxWidth: 100,
    },
    {
      Header: messages['L__CLIENT_FULLNAME'],
      accessor: 'custFio',
      Cell: obj => (
        <span>
          {obj.original.customerId && (
            <LinkToCustomerHrc03
              customerId={obj.original.customerId}
              customerName={obj.original.custFio}
            />
          )}
        </span>
      ),
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['custFio'] }),
      filterAll: true,
      width: 250,
      minWidth: 200,
      maxWidth: 250,
    },
    {
      Header: messages['L__PRODUCT_SERIAL_NUMBER'],
      accessor: 'tovarSerial',
      width: 100,
      minWidth: 100,
      maxWidth: 130,
    },
    {
      Header: messages['L__STATUS'],
      accessor: 'contLsStatus',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['contLsStatus'] }),
      filterAll: true,
      minWidth: 70,
      maxWidth: 100,
    },
    {
      Header: messages['phys_status'],
      accessor: 'physCond',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['physCond'] }),
      filterAll: true,
      minWidth: 70,
      maxWidth: 100,
    },
    {
      Header: messages['dealer'],
      accessor: 'diler',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['diler'] }),
      filterAll: true,
    },
    {
      Header: messages['collector'],
      accessor: 'contribFio',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['contribFio'] }),
      filterAll: true,
      minWidth: 100,
      maxWidth: 250,
    },
    {
      Header: messages['kind'],
      accessor: 'contType',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['contType'] }),
      filterAll: true,
      minWidth: 90,
      maxWidth: 170,
    },
    {
      Header: messages['price'],
      accessor: 'price',
      width: 70,
      minWidth: 70,
      maxWidth: 90,
    },
    {
      Header: messages['TBL_H__PAID'],
      accessor: 'paid',
      width: 50,
      minWidth: 50,
      maxWidth: 70,
    },
    {
      Header: messages['L__REMAINING_AMOUNT'],
      accessor: 'rest',
      width: 70,
      minWidth: 70,
      maxWidth: 90,
    },
    {
      Header: messages['extraInfo'],
      accessor: 'info',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['info'] }),
      filterAll: true,
      minWidth: 90,
      maxWidth: 150,
    },
  ];
  return (
    <div>
      {contlist === undefined || contlist.length == 0 ? (
        ''
      ) : (
        <ReactTable
          filterable
          columns={columns}
          data={contlist}
          resolveData={data => data.map(row => row)}
          rowsText={messages['rowsText']}
          pageText={messages['pageText']}
          ofText={messages['ofText']}
          previousText={messages['previousText']}
          nextText={messages['nextText']}
          noDataText={messages['loadingText']}
        />
      )}
    </div>
  );
}
