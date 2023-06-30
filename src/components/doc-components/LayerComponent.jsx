import React, { useContext, useEffect, useState } from 'react';

import L from 'leaflet';
import 'leaflet.tilelayer.colorfilter';
import 'leaflet/dist/leaflet.css';
import { TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import AppContext from 'context/Context';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useNavigate } from 'react-router-dom';
import MarkerIcon from '../../assets/img/biotronica/marker-icon.png';
import MarkerIconRed from '../../assets/img/biotronica/marker-icon-red.png';
export default function LayerComponent({
  markers,
  farmRoute,
  setFarm,
  setRouteUrl
}) {
  const navigate = useNavigate();
  const [waypoints, setWaypoints] = useState([]);
  const map = useMap();
  const { config } = useContext(AppContext);
  const { isDark } = config;
  const filter = isDark
    ? [
        'invert:98%',
        'grayscale:69%',
        'bright:89%',
        'contrast:111%',
        'hue:205deg',
        'saturate:1000%'
      ]
    : ['bright:101%', 'contrast:101%', 'hue:23deg', 'saturate:225%'];

  useEffect(() => {
    map.invalidateSize();
  }, [config]);

  useEffect(() => {
    let aux = [];
    farmRoute?.map(waypoint => {
      aux.push({
        id: waypoint.id,
        name: waypoint.name,
        lat: waypoint.latitude,
        lng: waypoint.longitude
      });
    });
    setWaypoints(() => aux);
  }, [farmRoute]);

  useEffect(() => {
    if (map) {
      L.tileLayer
        .colorFilter(
          'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
          {
            attribution: null,
            transparent: true,
            filter: filter
          }
        )
        .addTo(map);
    }
  }, [isDark]);
  console.log(farmRoute);
  useEffect(() => {
    if (farmRoute.length < 1) return;
    /*     markers?.map(waypoint => {
      if (waypoint) {
        waypoints.push(L.latLng(waypoint.latitude, waypoint.longitude));
      }
    }); */

    const routingControl = L.Routing.control({
      waypoints: [...waypoints],
      routeWhileDragging: false,
      lineOptions: {
        styles: [
          {
            color: 'blue',

            opacity: 0.6,
            weight: 4,
            display: 'none'
          }
        ]
      },
      addWaypoints: false,
      createMarker: function () {
        return null;
      },
      draggableWaypoints: true,
      fitSelectedRoutes: false,
      showAlternatives: false
    }).addTo(map);
    routingControl.hide();

    routingControl.on('routeselected', function (e) {
      var { coordinates } = e.route;

      const origin = { lat: coordinates[0].lat, lng: coordinates[0].lng };
      const destination = {
        lat: coordinates[coordinates.length - 1].lat,
        lng: coordinates[coordinates.length - 1].lng
      };

      const middleMarkers = waypoints.slice(1, farmRoute.length - 1);
      let formattedWaypoints = [];

      middleMarkers.map(item => {
        formattedWaypoints.push(
          `${item.lat.toFixed(6)}%2C${item.lng.toFixed(6)}`
        );
      });

      const URL = {
        baseURL: 'https://www.google.com/maps/dir/?api=1',
        origin: `&origin=${origin.lat}%2C${origin.lng}`,
        destination: `&destination=${destination.lat}%2C${destination.lng}`,
        travelMode: '&travelmode=driving',
        waypoints:
          middleMarkers.length > 0
            ? `&waypoints=${formattedWaypoints.join('%7C')}`
            : ''
      };

      const routeURL =
        URL.baseURL +
        URL.origin +
        URL.destination +
        URL.travelMode +
        URL.waypoints;
      console.log(routeURL);
      setRouteUrl(routeURL);
    });

    return () => map.removeControl(routingControl);
  }, [waypoints]);

  return (
    <>
      <TileLayer
        attribution={null}
        url={'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
      />
      <MarkerClusterGroup chunkedLoading={true} spiderfyOnMaxZoom={false}>
        {markers.map((marker, index) => (
          <>
            <Marker
              key={index}
              position={[marker.latitude, marker.longitude]}
              eventHandlers={{
                click: () => {
                  setFarm(marker || []);
                },
                dblclick: () => {
                  navigate('/gateways', { state: { name: marker.name } });
                }
              }}
              icon={L.icon({
                iconUrl: waypoints.some(el => el.id === marker.id)
                  ? MarkerIconRed
                  : MarkerIcon,

                iconAnchor: [22, 36]
              })}
            >
              <Popup>
                <div className="text-center">
                  <h6 className="mb-1">{marker.name}</h6>
                  <p className="m-0 text-700">
                    {marker.street} {marker.location}
                  </p>
                  <p className="m-0 text-700">
                    {marker.latitude.toFixed(6)}, {marker.longitude.toFixed(6)}
                  </p>
                  {/*                   <div>
                    <input
                      type="checkbox"
                      id="waypoint"
                      name="vehicle1"
                      value={marker.id}
                      onChange={e => {
                        if (e.target.checked) {
                          setWaypoint([
                            ...waypoints,
                            {
                              id: marker.id,
                              name: marker.name,
                              lat: marker.latitude,
                              lng: marker.longitude
                            }
                          ]);
                        } else {
                          setWaypoint(
                            waypoints.filter(item => item.id !== marker.id)
                          );
                        }
                      }}
                    />
                    <label className="text-black" htmlFor="waypoint">
                      {waypoints.length === 0
                        ? 'Definir ponto de partida'
                        : `Rota ${waypoints.length}`}
                    </label>
                  </div> */}
                </div>
              </Popup>
            </Marker>
          </>
        ))}
      </MarkerClusterGroup>
    </>
  );
}

/* LayerComponent.PropTypes = {
  setFarm: PropTypes.any,
  markers: PropTypes.any
};
 */

/*

https://www.google.com/maps/dir/?api=1&origin=49.794150%2C-84.564514&destination=49.173205%2C-84.756775&&travelmode=driving&waypoints=49.244978%2C-88.146057


desestruturação da url:

https://www.google.com/maps/dir/?api=1 => URL base

&origin=49.794150%2C-84.564514& => Coordenada de origem (array[0])
&destination=49.173205%2C-84.756775 => Coordenada de destino (array.at(-1))

&travelmode=driving => Meio de transporte (driving)

&waypoints=49.244978%2C-88.146057 => "pontos de parada" (arr[1] até arr.at(-2))

Exemplo de como pegar todos os elementos do array, exceto o primeiro e o último:
const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
const citrus = fruits.slice(1, fruits.length-1); 

*/
