import React, { useState } from 'react';

import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import { Col, Row } from 'react-bootstrap';
import ModalBox from 'components/common/ModalBox';
import { latLng } from 'leaflet';
function SelectedIds(table) {
  const rowIds = Object.keys(table.selectedRowIds);

  rowIds.map(item => {
    console.log(table.page[item].original);
  });
}

const elapsedTime = timestamp => {
  const ms = {
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000
  };

  let seconds = Math.floor((timestamp / ms.second) % 60);
  let minutes = Math.floor((timestamp / ms.minute) % 60);
  let hours = Math.floor((timestamp / ms.hour) % 24);
  let days = Math.floor(timestamp / ms.day);

  return `\n(${days}d ${hours}h ${minutes}m ${seconds}s)`;
};

const timestampToDateTime = timestamp => {
  const dateObject = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(dateObject);

  return formattedDate;
};

function ListTable({ listdata }) {
  console.log('list data', listdata);
  const [modal, setModal] = useState(false);
  const [farmName, setFarmName] = useState('');
  const columns = [
    {
      accessor: 'id',
      Header: '',
      headerProps: { className: 'visually-hidden' },
      cellProps: {
        className: 'pe-5 visually-hidden'
      }
    },

    {
      accessor: 'name',
      Header: 'Fazenda ',

      cellProps: {
        className: 'pe-5 '
      },

      Cell: rowData => {
        const { name } = rowData.row.original;
        return <strong className="me-2"> {name}</strong>;
      }
    },
    {
      accessor: 'street',
      Header: 'Endereço ',
      cellProps: {
        className: 'pe-5 '
      },
      Cell: rowData => {
        const { street, location, city } = rowData.row.original;
        return (
          <p className="me-2 fs-0">
            {' '}
            {street} {location} <br />
            {city}
          </p>
        );
      }
    },

    {
      accessor: 'last_fill',
      Header: 'Última Coleta Em ',
      cellProps: {
        className: ' pe-5 align-middle justify-center white-space-nowrap '
      },
      Cell: rowData => {
        const { last_fill_date, elapsed_time } = rowData.row.original;
        return (
          <p className="me-2 fs-0">
            {' '}
            {last_fill_date} <br />
            {elapsed_time}
          </p>
        );
      }
    },
    {
      accessor: 'none',
      Header: 'Tanques',
      cellProps: {
        className: 'p-2 '
      },
      Cell: rowData => {
        const { name, tanks } = rowData.row.original;

        return (
          <>
            <div>
              <button
                type="button"
                className="btn btn-success fs--1"
                value={name}
                onClick={e => {
                  setModal(!modal);
                  setFarmName(() => e.target.value);
                }}
              >
                Ver Tanques
              </button>
            </div>
            <ModalBox modal={modal} setModal={setModal} size={'lg'}>
              <h3 className="text-center mt-3">Tanques de {farmName}</h3>
              <hr />
              <table className="table text-center">
                <thead>
                  <tr>
                    <th scope="col">Tanque</th>
                    <th scope="col">Volume</th>
                    <th scope="col">Temperatura</th>
                    <th scope="col">Última Coleta</th>
                  </tr>
                </thead>
                <tbody>
                  {tanks.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.volume}L</td>
                        <td>{item.temp}ºC</td>
                        <td>
                          {item.last_fill_date}
                          <br />
                          {item.elapsed_time}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </ModalBox>
          </>
        );
      }
    }
  ];
  const now = Date.now();
  const data = [];
  listdata?.map(item => {
    const rndDate = Math.floor(Math.random() * 172800000);
    const rndVol = Math.floor(Math.random() * 2000);
    data.push({
      id: item.id,
      name: item.name,
      street: `${item.street},\n ${item.location}`,
      city: item.city,
      last_fill_date: `${timestampToDateTime(now - rndDate)}`,
      elapsed_time: `${elapsedTime(rndDate)}`,
      volume: `${rndVol}L`,
      latLng: latLng(item.latitude, item.longitude),
      tanks: [
        {
          volume: Math.floor(Math.random() * 2000),
          temp: Math.floor(Math.random() * 15),
          last_fill_date: `${timestampToDateTime(now - rndDate)}`,
          elapsed_time: `${elapsedTime(rndDate)}`
        },
        {
          volume: Math.floor(Math.random() * 2000),
          temp: Math.floor(Math.random() * 15),
          last_fill_date: `${timestampToDateTime(now - rndDate)}`,
          elapsed_time: `${elapsedTime(rndDate)}`
        },
        {
          volume: Math.floor(Math.random() * 2000),
          temp: Math.floor(Math.random() * 15),
          last_fill_date: `${timestampToDateTime(now - rndDate)}`,
          elapsed_time: `${elapsedTime(rndDate)}`
        }
      ]
    });
  });

  return (
    <AdvanceTableWrapper
      columns={columns}
      data={data}
      sortable
      pagination
      selection
      perPage={5}
    >
      <Row className="flex-start-center mb-3">
        <Col xs="auto" sm={6} lg={6}>
          <AdvanceTableSearchBox
            table
            placeholder="Buscar fazenda por nome..."
          />
        </Col>
      </Row>
      <SelectedIds table />
      <AdvanceTable
        table
        headerClassName="bg-200 text-900 text-nowrap align-middle"
        rowClassName="align-middle white-space-nowrap fs-1"
        tableProps={{
          size: 'lg',

          bordered: true,
          striped: false,
          className: 'fs--1 mb-0 overflow-hidden'
        }}
      />
      <div className="mt-3">
        <AdvanceTableFooter
          rowCount={data.length}
          table
          rowInfo
          navButtons
          rowsPerPageSelection
        />
      </div>
    </AdvanceTableWrapper>
  );
}

export default ListTable;

//`${timestampToDateTime(now - rndInt)}\u000A(${elapsedTime(rndInt)})`,
