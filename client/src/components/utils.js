export const LOCATIONS = [
  {
    id: '1',
    name: 'Wyncode',
    address: '549 nw 28th st',
    city: 'miami',
    state: 'florida',
    zip: '33127'
  },
  {
    id: '2',
    name: "Joe's Stone Crab",
    address: '11 washington ave',
    city: 'miami beach',
    state: 'florida',
    zip: '33139'
  },
  {
    id: '3',
    name: 'Zuma',
    longitude: -80.1896,
    latitude: 25.7705,
    address: '270 biscayne blvd way',
    city: 'miami',
    state: 'florida',
    zip: '33131'
  },
  {
    id: '4',
    name: 'Home',
    address: '8900 sw 197th st',
    city: 'miami',
    state: 'florida',
    zip: '33157'
  }
];

export const convertAddressToQuery = ({ address, city, state, zip }) => {
  const baseAddress = `${address} ${city} ${state} ${zip}`;

  return baseAddress.split(' ').join('%20');
};

export const getLocations = () => new Promise((resolve) => resolve(LOCATIONS));

export const MARKER_LAYER = {
  id: 'markers',
  type: 'symbol',
  source: 'markers',
  layout: {
    'icon-image': 'mapbox-logo',
    'icon-size': 0.5,
    'icon-allow-overlap': true
  }
};
