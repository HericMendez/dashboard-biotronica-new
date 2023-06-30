import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import SoftBadge from 'components/common/SoftBadge';
import { Link, useLocation } from 'react-router-dom';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import axios from 'axios';

const columns = [
  {
    accessor: 'id',
    Header: 'Gateway Info',
    headerProps: { className: 'pe-1' },
    cellProps: {
      className: 'py-2'
    },
    Cell: rowData => {
      const { id, name, type, state, mac_address, model } =
        rowData.row.original;
      return (
        <div className="d-flex flex-0 align-center">
          <div className="d-flex flex-column">
            <Link
              to={`/gateway_devices/${mac_address}`}
              state={{
                id: id,
                type: type,
                name: name,
                model: model,
                state: state,
                mac_address: mac_address
              }}
            >
              <strong className="fs-1">{name}</strong>
            </Link>{' '}
            <strong>{mac_address}</strong> <br />
          </div>
        </div>
      );
    }
  },
  {
    accessor: 'farm__name',

    Header: 'Farm Name',

    headerProps: {
      className: 'text-center'
    },
    cellProps: {
      className: 'fs-0'
    },
    Cell: rowData => {
      const { farm__name } = rowData.row.original;
      return (
        <div className="d-flex justify-content-center">
          <p>{farm__name}</p>
        </div>
      );
    }
  },
  {
    accessor: 'type',

    Header: 'Type',

    headerProps: {
      className: 'text-center'
    },
    cellProps: {
      className: 'fs-0'
    },
    Cell: rowData => {
      const { type } = rowData.row.original;
      return (
        <div className="d-flex justify-content-center">
          <p>{type}</p>
        </div>
      );
    }
  },
  {
    accessor: 'model',
    Header: 'Gateway Type',
    headerProps: {
      className: 'text-center flex '
    },
    cellProps: {
      className: 'text-center fs-0 fw-medium py-2'
    },
    Cell: rowData => {
      return <p>{rowData.row.original.model}</p>;
    }
  },

  {
    accessor: 'state',
    Header: 'Status',
    headerProps: {
      className: 'text-center'
    },
    cellProps: {
      className: 'text-center ',
      style: { width: 90 }
    },
    Cell: rowData => {
      const { state } = rowData.row.original;
      return (
        <SoftBadge
          pill
          bg={state === 'off' ? 'danger' : 'success'}
          className="fs-2 pl-2 mb-3"
        >
          <strong className="me-2"> {state}</strong>
        </SoftBadge>
      );
    }
  }
  /*   {
    accessor: 'none',
    Header: '',
    disableSortBy: true,
    cellProps: {
      className: 'text-end'
    },
    Cell: () => {
      return (
        <CardDropdown iconClassName="fs--1">
          <div className="py-2">
            <Dropdown.Item href="#!">Option 1</Dropdown.Item>
            <Dropdown.Item href="#!">Option 2</Dropdown.Item>
            <Dropdown.Item href="#!">Option 3</Dropdown.Item>
            <Dropdown.Item href="#!">Option 4</Dropdown.Item>
          </div>
        </CardDropdown>
      );
    }
  } */
];

const Gateways = () => {
  const [gatewayList, setGatewayList] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    (async function getGateways() {
      await axios
        .get('https://cliente.biotronica.tech/products/gateway', {
          headers: {
            Authorization: `${document.cookie}`
          }
        })
        .then(response => {
          console.log(response.data.gateways);

          setGatewayList(() => response.data.gateways || []);
          console.log('deu bom: ', response.data);
        })
        .catch(e => console.log(e));
    })();
  }, []);

  return (
    <AdvanceTableWrapper
      columns={columns}
      data={gatewayList}
      sortable
      pagination
      perPage={10}
    >
      <Card className="mb-3">
        <Card.Header>
          {/*    <GatewaysTableHeader table /> */}
          <h5>
            {' '}
            {state.name ? `Gateways de ${state.name}` : 'Todos os Gateways'}
          </h5>
        </Card.Header>
        <Card.Body className="p-0">
          <AdvanceTable
            table
            headerClassName="bg-200 text-900 text-nowrap align-middle"
            rowClassName="align-middle white-space-nowrap"
            tableProps={{
              size: 'sm',
              striped: false,
              className: 'fs--1 mb-0 overflow-hidden'
            }}
          />
        </Card.Body>
        <Card.Footer>
          <AdvanceTablePagination table />
        </Card.Footer>
      </Card>
    </AdvanceTableWrapper>
  );
};

export default Gateways;
