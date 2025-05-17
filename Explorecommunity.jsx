import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker images for React/ESM setup
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon path issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const lgas = [
  { "name": "Aba North", "lat": 5.139, "lng": 7.353 },
  { "name": "Aba South", "lat": 5.106, "lng": 7.366 },
  { "name": "Arochukwu", "lat": 5.387, "lng": 7.911 },
  { "name": "Bende", "lat": 5.557, "lng": 7.633 },
  { "name": "Ikwuano", "lat": 5.458, "lng": 7.611 },
  { "name": "Isiala Ngwa North", "lat": 5.343, "lng": 7.475 },
  { "name": "Isiala Ngwa South", "lat": 5.227, "lng": 7.515 },
  { "name": "Isuikwuato", "lat": 5.741, "lng": 7.546 },
  { "name": "Obi Ngwa", "lat": 5.135, "lng": 7.482 },
  { "name": "Ohafia", "lat": 5.614, "lng": 7.821 },
  { "name": "Osisioma Ngwa", "lat": 5.094, "lng": 7.424 },
  { "name": "Ugwunagbo", "lat": 5.096, "lng": 7.412 },
  { "name": "Ukwa East", "lat": 4.859, "lng": 7.527 },
  { "name": "Ukwa West", "lat": 4.873, "lng": 7.335 },
  { "name": "Umuahia North", "lat": 5.538, "lng": 7.494 },
  { "name": "Umuahia South", "lat": 5.477, "lng": 7.517 },
  { "name": "Umu Nneochi", "lat": 5.778, "lng": 7.372 }
];

// Recenter map component
function RecenterMap({ lat, lng }) {
  const map = useMap();
  map.flyTo([lat, lng], 12);
  return null;
}

export default function ExploreCommunity() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLGA, setSelectedLGA] = useState(null);

  const filteredLGAs = lgas.filter(lga =>
    lga.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const center = selectedLGA
    ? [selectedLGA.lat, selectedLGA.lng]
    : [5.106, 7.366]; // Default to Aba South

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-center">Explore Community Reports</h2>

      <input
        type="text"
        placeholder="Search Local Government..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <select
        className="w-full border rounded px-3 py-2"
        onChange={(e) =>
          setSelectedLGA(lgas.find((lga) => lga.name === e.target.value))
        }
      >
        <option value="">Select Local Government</option>
        {filteredLGAs.map((lga, index) => (
          <option key={index} value={lga.name}>
            {lga.name}
          </option>
        ))}
      </select>

      {selectedLGA && (
        <div className="border p-4 rounded bg-gray-50">
          <h3 className="font-semibold">Selected LGA:</h3>
          <p>{selectedLGA.name}</p>
          <p>Latitude: {selectedLGA.lat}</p>
          <p>Longitude: {selectedLGA.lng}</p>
        </div>
      )}

      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedLGA && (
          <>
            <RecenterMap lat={selectedLGA.lat} lng={selectedLGA.lng} />
            <Marker position={[selectedLGA.lat, selectedLGA.lng]}>
              <Popup>{selectedLGA.name}</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
}