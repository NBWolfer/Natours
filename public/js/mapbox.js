/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);

const map = L.map('map', {
  dragging: true,
  doubleClickZoom: false,
  closePopupOnClick: false,
  zoomControl: false,
  keyboard: false,
  scrollWheelZoom: false,
  zoomAnimation: false,
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 15,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  crossOrigin: true,
}).addTo(map);

const customZoomControl = L.Control.extend({
  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'custom-zoom-control');
    container.innerHTML = `
      <button class="zoom-in-btn">+</button>
      <button class="zoom-out-btn">-</button>
    `;

    const zoomInButton = container.querySelector('.zoom-in-btn');
    const zoomOutButton = container.querySelector('.zoom-out-btn');

    zoomInButton.addEventListener('click', function () {
      map.zoomIn();
    });

    zoomOutButton.addEventListener('click', function () {
      map.zoomOut();
    });

    return container;
  },
});

new customZoomControl({ position: 'topright' }).addTo(map);

const markerArray = [];
locations.forEach((loc) => {
  const reversedArr = [...loc.coordinates].reverse();

  const myIcon = L.icon({
    iconUrl: './../img/pin.png',
    iconSize: [30, 35],
    iconAnchor: [15, 35],
  });

  const marker = L.marker(reversedArr, { icon: myIcon }).addTo(map);
  markerArray.push(reversedArr);

  const popupContent = `<p>Day ${loc.day}</br>${loc.description}</p>`;
  const popup = L.popup({
    className: 'leaflet-popup',
    offset: [0, -34],
  }).setContent(popupContent);

  marker.on('mouseover', function () {
    this.openPopup();
  });

  marker.on('mouseout', function () {
    this.closePopup();
  });

  marker.bindPopup(popup);
});
const bounds = L.latLngBounds(markerArray);
map.fitBounds(bounds, { padding: [200, 200] });
