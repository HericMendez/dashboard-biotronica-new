import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
});

export default function RoutingMachine(props) {
  const map = useMap();
  const waypoints = [];
  useEffect(() => {
    if (!map) return;
    props.markers?.map(waypoint => {
      if (waypoint) {
        waypoints.push(L.latLng(waypoint.latitude, waypoint.longitude));
      }
    });
    console.log('waypoints', waypoints);
    const routingControl = L.Routing.control({
      waypoints: waypoints,
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
      // Do something with the route here
      console.log(origin, destination);
    });

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}
