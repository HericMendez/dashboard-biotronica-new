import React, { useState } from 'react';
import PageHeader from 'components/common/PageHeader';
import { useLocation } from 'react-router-dom';
import SoftBadge from 'components/common/SoftBadge';
import BarLineMixedChart from 'components/doc-components/charts-example/echarts/bar-charts/BarLineMixedChart';
import { useQuery } from 'react-query';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptbr from 'date-fns/locale/pt-BR';
import DashboardCard from 'components/dashboards/default/DashboardCard';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import { Watch } from 'react-loader-spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableContainer } from '@mui/material';
registerLocale('ptbr', ptbr);

const DeviceDetails = () => {
  const { state } = useLocation();

  const date = new Date('January 1, 2023 01:00:00');
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(new Date());
  const [deviceData, setDeviceData] = useState([]);
  const [currentDataId, setCurrentDataId] = useState(0);
  const initialChartState = [
    { data: 0, timestamp: new Date().getTime() / 1000 }
  ];
  const initialStatus = {
    refetchinterval: 1000,
    isloading: true
  };
  const [realTimeChartData, setRealTimeChartData] = useState(initialChartState);
  const [historyChartData, setHistoryChartData] = useState(initialChartState);

  const [chartStatus, setChartStatus] = useState(initialStatus);
  const timestampToDateTime = timestamp => {
    const milliseconds = timestamp * 1000; // 1575909015000

    const dateObject = new Date(milliseconds);

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(dateObject);

    return formattedDate;
  };
  function filterResults(content, mod) {
    setRealTimeChartData(initialChartState);
    let filtered = [];
    for (let j = 0; j < content.length; j++) {
      if (j % mod === 0) {
        filtered.push(content[j]);
      }
    }
    setHistoryChartData(() => filtered);
  }
  async function getrealTimeChartData() {
    setChartStatus({
      refetchinterval: 0,
      isloading: true
    });

    await axios
      .post(
        'https://cliente.biotronica.tech/telemetry/data/timestamp',
        {
          timebeggin: Math.round(startDate.getTime() / 1000),
          timeend: Math.round(endDate.getTime() / 1000),
          uuid: deviceData.uuid
        },
        {
          headers: {
            Authorization: document.cookie
          }
        }
      )
      .then(response => {
        // console.log('sssss', response.data.data.length);

        filterResults(response.data.data, 3600);
        setChartStatus({
          refetchinterval: 0,
          isloading: false
        });
      })
      .catch(e => console.log(e));
  }

  useQuery(
    'currentData',

    async () => {
      await axios
        .get(
          `https://cliente.biotronica.tech/products/characteristic/${state.mac_address}`,
          {
            headers: {
              Authorization: document.cookie
            }
          }
        )
        .then(async response => {
          setDeviceData(response.data.characteristics);
          await axios
            .get(
              `https://cliente.biotronica.tech/telemetry/data/${response.data.characteristics[currentDataId].uuid}`,
              //"https://cliente.biotronica.tech/123teste",

              {
                headers: {
                  Authorization: document.cookie
                }
              }
            )
            .then(response => {
              setRealTimeChartData(
                response.data
                  ? [...realTimeChartData, response.data]
                  : initialChartState
              );
              const chartLimit = realTimeChartData.length > 10;
              if (chartLimit) {
                setRealTimeChartData(realTimeChartData.slice(1));
              }
              setChartStatus({
                refetchinterval: 1000,
                isloading: false
              });
            })
            .catch(e => console.log('erro', e));
        })
        .catch(e => console.log(e));
    },
    {
      /*  */ refetchInterval: chartStatus.refetchinterval
    }
  );

  /*   useEffect(() => {
    setRefetchinterval(1000);
  }, []); */

  return (
    <>
      <DashboardCard>
        <Row className="g-0 p-2">
          <Col md={9}>
            <PageHeader
              title={''}
              titleTag="h3"
              className="m-2 d-flex flex-row "
            >
              <div className="mb-2 d-flex flex-row justify-content-between align-content-center">
                <select
                  className="bg-100 text-black w-50 fs-1 me-5 "
                  onChange={e => {
                    setRealTimeChartData(initialChartState);
                    setCurrentDataId(e.target.value);
                  }}
                >
                  {deviceData.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    );
                  })}
                  ;
                </select>
                <div className="d-flex flex-row ">
                  <p>
                    <SoftBadge
                      pill
                      bg={state.state === 'on' ? 'success' : 'danger'}
                      className="fs-1 p-2"
                    >
                      <strong className="ms-0 fs-1">
                        Status: {state.state}
                      </strong>
                    </SoftBadge>
                  </p>
                </div>
              </div>
              <div>
                <p className="fw-bold ">
                  {state.name} - {state.type_device}
                </p>
              </div>

              <div className="d-flex flex-row text-left">
                <p className=" mt-1 text-black ">
                  IP: <span style={{ color: '#f15922' }}>&nbsp;{state.ip}</span>{' '}
                </p>
                <p className="mt-1 ms-4 text-black ">
                  MAC Address:{' '}
                  <span style={{ color: '#f15922' }}>
                    &nbsp; {state.mac_address}
                  </span>{' '}
                </p>
              </div>
            </PageHeader>
          </Col>
          <Col md={3}>
            {' '}
            <br />
            <div className="d-flex flex-column align-center justify-content-around">
              <DatePicker
                selected={startDate}
                onChange={date =>
                  setStartDate(
                    date.getTime() < endDate.getTime() ? date : startDate
                  )
                }
                className="form-control"
                placeholderText="Select Date & Time"
                timeIntervals={5}
                dateFormat="dd/MM/yyyy HH:mm"
                showTimeSelect
                fixedHeight
              />

              <DatePicker
                selected={endDate}
                onChange={date =>
                  setEndDate(
                    date.getTime() > startDate.getTime() ? date : startDate
                  )
                }
                className="form-control"
                placeholderText="Select Date & Time"
                timeIntervals={5}
                dateFormat="dd/MM/yyyy HH:mm"
                showTimeSelect
                fixedHeight
              />
              <br></br>
              <input
                type="button"
                className="bg-100 p-2 rounded-3 text-black fw-bold "
                value="Consultar Intervalo"
                onClick={getrealTimeChartData}
              />
            </div>
          </Col>
        </Row>
      </DashboardCard>
      <br />
      {chartStatus.isloading ? (
        <Watch
          height="80"
          width="80"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        <DashboardCard>
          <Row className="g-0 p-2">
            <Col md={9}>
              <BarLineMixedChart
                data={
                  historyChartData.length > 1
                    ? historyChartData
                    : realTimeChartData
                }
              />
            </Col>
            <Col md={3} className="d-flex flex-column text-black text-center">
              <h4>{deviceData[currentDataId].name}</h4>

              <TableContainer
                sx={{
                  height: '50vh'
                }}
              >
                <Table size="small">
                  <TableBody style={{ overflowY: 'scroll' }}>
                    {(historyChartData.length > 1
                      ? historyChartData
                      : realTimeChartData
                    )
                      .slice(0)
                      .reverse()
                      .map(row => (
                        <TableRow key={row.id}>
                          <TableCell className="text-black">
                            {timestampToDateTime(row.timestamp)}
                          </TableCell>

                          <TableCell
                            className="text-warning fw-semi-bold"
                            align="right"
                          >
                            {row.data}
                            {deviceData[currentDataId].measurement}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Col>
          </Row>
        </DashboardCard>
      )}
    </>
  );
};

export default DeviceDetails;

/*
      <DashboardCard >


<Row className="g-3 mb-3">
<Col md={9}>

</Col>
<Col md={3}>

        {" "}
        <br />
  <h4>Fazenda Onovolab</h4>


</Col>
</Row>

</DashboardCard>

*/
