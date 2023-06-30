import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import L from 'leaflet';
L.icon({
  iconUrl:
    'https://lens-storage.storage.googleapis.com/png/57228fc0b54348b58b5d3559f1202ab6'
});
const DashboardCard = ({ children }) => {
  return (
    <Card className="h-lg-100 d-flex align-center justify-content-center">
      <div className="p-2">{children}</div>
    </Card>
  );
};

DashboardCard.propTypes = {
  width: PropTypes.string,
  amountClassName: PropTypes.string,
  children: PropTypes.any
};

export default DashboardCard;
