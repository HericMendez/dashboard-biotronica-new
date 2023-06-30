import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import axios from 'axios';
import SoftBadge from 'components/common/SoftBadge';

const columns = [
  {
    accessor: 'id',
    Header: 'Groups',
    headerProps: { className: 'pe-1' },
    cellProps: {
      className: 'py-2'
    },
    Cell: rowData => {
      const { id, name, ip, mac_address, state, type_device, gateway_id } =
        rowData.row.original;
      return (
        <div className="d-flex flex-row">
          <div className="d-flex flex-column">
            <Link
              to={`/device/${mac_address}`}
              state={{
                id: id,
                gateway_id: gateway_id,
                ip: ip,
                name: name,
                type_device: type_device,
                mac_address: mac_address,
                state: state
              }}
            >
              <strong className="fs-1">{name}</strong>
            </Link>{' '}
            <strong>{mac_address}</strong>
          </div>
        </div>
      );
    }
  },

  {
    accessor: 'type_device',
    Header: 'Device Type',
    headerProps: {
      className: 'text-center'
    },
    cellProps: {
      className: 'text-center fs-0 fw-medium py-2'
    },
    Cell: rowData => {
      const { type_device } = rowData.row.original;
      return <p>{type_device}</p>;
    }
  },

  {
    accessor: 'ip',
    Header: 'IP',
    headerProps: {
      className: 'text-center'
    },
    cellProps: {
      className: 'text-center fs-0 fw-medium py-2'
    },
    Cell: rowData => {
      const { ip } = rowData.row.original;
      return <p>{ip}</p>;
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

const Devices = () => {
  const [deviceList, setDeviceList] = useState([]);

  let { mac_address } = useParams();
  const { state } = useLocation();
  console.log(state?.name);
  if (mac_address) console.log('mac', mac_address);

  useEffect(() => {
    (async function getGateways() {
      const url = mac_address
        ? `https://cliente.biotronica.tech/products/device/${mac_address}
        `
        : `https://cliente.biotronica.tech/products/device`;
      console.log(url);
      await axios
        .get(url, {
          headers: {
            Authorization: `${document.cookie}`
          }
        })
        .then(response => {
          console.log(response.data.devices);

          setDeviceList(() => response.data.devices || []);
          console.log('devices: ', response.data);
        })
        .catch(e => console.log(e));
    })();
  }, []);

  return (
    <AdvanceTableWrapper
      columns={columns}
      data={deviceList}
      sortable
      pagination
      perPage={10}
    >
      <Card className="mb-3">
        <Card.Header>
          {/*    <DevicesTableHeader table /> */}
          <h5>
            {state.name
              ? `Dispositivos de ${state.name}`
              : 'Todos os Dispositivos'}
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

export default Devices;
