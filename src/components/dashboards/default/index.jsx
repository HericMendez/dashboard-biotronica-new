import React, { useState, useContext, useEffect } from 'react';
import DashboardCard from './DashboardCard';
import { Row, Col } from 'react-bootstrap';
import 'leaflet.tilelayer.colorfilter';
import 'leaflet/dist/leaflet.css';
import { MapContainer } from 'react-leaflet';
import AppContext from 'context/Context';
import ModalBox from 'components/common/ModalBox';
import ListTable from './ListTable';
import { FaHandPointRight } from 'react-icons/fa';
import LayerComponent from 'components/doc-components/LayerComponent';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { TableContainer } from '@mui/material';
import axios from 'axios';
const Dashboard = () => {
  const initialMapState = {
    city: '',
    cnpj: '',
    id: 0,
    latitude: 0,
    longitude: 0,
    location: '',

    name: '',
    street: ''
  };

  const [farms, setFarms] = useState([initialMapState]);

  const [currentFarm, setCurrentFarm] = useState([]);
  const [userData, setUserData] = useState([]);
  const [farmRoute, setFarmRoute] = useState([]);
  const [routeUrl, setRouteUrl] = useState();
  const [modal, setModal] = useState(false);
  const [filteredRoute, setFilteredRoute] = useState('');
  useEffect(() => {
    (async function getUserData() {
      await axios
        .get('https://cliente.biotronica.tech/company/association', {
          headers: {
            Authorization: `${document.cookie}`
          }
        })
        .then(response => {
          setFarms(response.data.farms);
          console.log('deu bom: ', response.data);
        })
        .catch(e => console.log(e));
    })();
  }, []);

  const fetchAllUserData = () => {
    const baseURL = 'https://cliente.biotronica.tech';
    let summary = {
      numberOfFarms: 0,
      numberOfGateways: 0,
      numberOfDevices: 0,

      devicesOn: 0,
      devicesOff: 0,
      gatewaysOn: 0,
      gatewaysOff: 0
    };

    const fetchedData = [];
    let endpoints = [
      `${baseURL}/company/association`,
      `${baseURL}/products/gateway`,
      `${baseURL}/products/device`
    ];

    // Return our response in the allData variable as an array
    Promise.all(
      endpoints.map(endpoint =>
        axios.get(endpoint, {
          headers: {
            Authorization: `${document.cookie}`
          }
        })
      )
    ).then(
      axios.spread((...allData) => {
        console.log('all data:', allData);
        summary.numberOfFarms = allData;
        allData.forEach(response => {
          if (response.status === 200) {
            fetchedData.push(response.data);
          }
        });
        summary.numberOfFarms = fetchedData[0].farms.length;
        summary.numberOfGateways = fetchedData[1].gateways.length;
        summary.numberOfDevices = fetchedData[2].devices.length;
        fetchedData[1].gateways?.forEach(device =>
          device?.state === 'on' ? summary.gatewaysOn++ : summary.gatewaysOff++
        );
        fetchedData[2].devices?.forEach(device =>
          device?.state === 'on' ? summary.devicesOn++ : summary.devicesOff++
        );
        setUserData(() => summary);
      })
    );
  };

  useEffect(() => {
    fetchAllUserData();
  }, []);

  const isChecked = id => {
    let checked = farmRoute.some(farm => farm.id === id);
    console.log('checked', id, checked);
    return checked;
  };

  const position = [-21.526308777439436, -47.755420181174884];
  const {
    config: { isRTL }
  } = useContext(AppContext);

  return (
    <>
      <Row className="g-3 mb-3">
        <Col md={12}>
          <DashboardCard>
            <div
              style={{ height: '12vh' }}
              className="d-flex flex-row align-center justify-content-around p-2"
            >
              <div className="text-center">
                <h1
                  style={{ fontWeight: 300, fontSize: '3vh' }}
                  className="me-2   mb-2"
                >
                  FAZENDAS
                </h1>
                <h3 className="mb-1 text-900 fw-normal lh-1">
                  {userData.numberOfFarms || 0}
                </h3>
              </div>

              <div className="text-center">
                <h1
                  style={{ fontWeight: 300, fontSize: '3vh' }}
                  className="me-2  mb-2"
                >
                  GATEWAYS
                </h1>
                <h3 className="mb-1 text-900 fw-normal lh-1">
                  <span className="text-success">
                    {userData.numberOfGateways || 0}
                  </span>{' '}
                  /{' '}
                  <span className="text-info">{userData.gatewaysOn || 0}</span>{' '}
                </h3>
              </div>

              <div className="text-center">
                <h1
                  style={{ fontWeight: 300, fontSize: '3vh' }}
                  className="me-2   mb-2"
                >
                  DEVICES
                </h1>
                <h3 className="mb-1 text-900 fw-normal lh-1">
                  <span className="text-success">
                    {userData.numberOfDevices || 0}
                  </span>{' '}
                  / <span className="text-info">{userData.devicesOn || 0}</span>{' '}
                </h3>
              </div>
            </div>
          </DashboardCard>
        </Col>
      </Row>

      <DashboardCard>
        <Row>
          {currentFarm.name && (
            <Col className="d-flex" md={4}>
              <TableContainer className=" m-2 d-flex flex-column justify-content-start align-self-start">
                <Table size="small">
                  <TableBody
                    style={{
                      textAlign: 'left',
                      fontSize: '1.2rem',
                      padding: 10
                    }}
                  >
                    <div>
                      <h4>{currentFarm.name}</h4>
                      <hr className="text-black" />
                      <strong>
                        Endereço:
                        <br />{' '}
                      </strong>{' '}
                      <p className="text-black">
                        {currentFarm.street} - {currentFarm.location}
                      </p>
                      <strong>CNPJ:</strong>
                      <p className="text-black"> {currentFarm.cnpj}</p>
                    </div>
                    <div>
                      <h4 className="">Rotas</h4>
                      <hr className="text-black" />
                      <input
                        type="text"
                        value={filteredRoute}
                        className="w-100 bg-100 rounded-2 border-1 border-gray-300 mb-2 fs--1 p-2 text-700"
                        placeholder="Procure uma fazenda pelo nome..."
                        onChange={e => {
                          setFilteredRoute(e.target.value);
                        }}
                      />

                      {farms
                        .filter(item => {
                          if (!filteredRoute) return true;
                          if (item.name.includes(filteredRoute)) {
                            return true;
                          }
                          return false;
                        })
                        .map((farm, index) => {
                          return (
                            <div key={farm.id} className="mb-0 d-flex flex-row">
                              <label
                                style={{ color: ' #f15922' }}
                                className="fs-1 mb-0"
                              >
                                <input
                                  type="checkbox"
                                  id="waypoint"
                                  checked={isChecked(farm.id)}
                                  onChange={e => {
                                    if (e.target.checked) {
                                      setFarmRoute([...farmRoute, farm]);
                                    } else {
                                      setFarmRoute(
                                        farmRoute.filter(
                                          item => item.id !== farm.id
                                        )
                                      );
                                    }
                                  }}
                                />
                                &nbsp; {index + 1} - {farm.name}
                              </label>
                            </div>
                          );
                        })}
                      {/*  <label className="text-black" htmlFor="waypoint">
                        {farmRoute.length < 1
                          ? ` Ponto de partida: ${currentFarm.name}`
                          : ` Rota ${farmRoute.length}: ${currentFarm.name}`}
                      </label> */}
                      <button onClick={() => setModal(!modal)}>Modal</button>
                      <ModalBox modal={modal} setModal={setModal} size={'xl'}>
                        <ListTable listdata={farms} />
                      </ModalBox>
                    </div>
                    <div className="mt-4">
                      {farmRoute.length > 0 && (
                        <>
                          <p
                            className="mb-0 text-decoration-underline fw-bold fs-1"
                            style={{ color: ' #f15922' }}
                          >
                            Rota (Origem{' '}
                            <FaHandPointRight color=" #f15922" size={20} />{' '}
                            Destino):
                          </p>
                          {/*Opção 1: Rotas em  Lista */}
                          <>
                            {farmRoute.map((item, index) => {
                              return (
                                <p key={index} className="text-black m-0">
                                  {/* <FaHandPointRight
                                    color=" #f15922"
                                    size={24}
                                  /> */}
                                  {index + 1} - {item.name}
                                  <span style={{ color: ' #f15922' }}>
                                    {index === 0
                                      ? ' (Origem)'
                                      : index === farmRoute.length - 1
                                      ? ' (Destino)'
                                      : ''}
                                  </span>
                                </p>
                              );
                            })}
                          </>
                          {/*Opção 2: Rotas em  Linha */}
                          {/*          <>
                            <p className="fs-1 text-black">
                              {farmRoute.map((item, index) => {
                                return (
                                  <>
                                    {item.name}
                                    &nbsp;
                                    {index < farmRoute.length - 1 ? (
                                      <FaHandPointRight
                                        color=" #f15922"
                                        size={24}
                                      />
                                    ) : (
                                      ''
                                    )}
                                    &nbsp;
                                  </>
                                );
                              })}
                            </p>
                          </> */}
                        </>
                      )}
                      <br />
                      <a
                        className="d-flex align-self-end"
                        href={routeUrl}
                        target="_blank"
                        rel="noreferreer noreferrer"
                      >
                        <button className="w-100 p-2 bg-700 rounded-2 text-black fw-bold fs-1 ">
                          Exportar Link da Rota
                        </button>
                      </a>
                    </div>
                  </TableBody>
                </Table>
              </TableContainer>
            </Col>
          )}
          <Col md={currentFarm.name ? 8 : 12}>
            <div dir="ltr">
              <MapContainer
                zoom={isRTL ? 4.0 : 4}
                minZoom={isRTL ? 1.8 : 1.3}
                zoomSnap={0.2}
                center={position}
                radius={200}
                style={{ height: '70vh', width: '100%' }}
              >
                <LayerComponent
                  markers={farms}
                  setFarm={setCurrentFarm}
                  farmRoute={farmRoute}
                  setRouteUrl={setRouteUrl}
                />
              </MapContainer>
            </div>
          </Col>
        </Row>
      </DashboardCard>
    </>
  );
};

export default Dashboard;
