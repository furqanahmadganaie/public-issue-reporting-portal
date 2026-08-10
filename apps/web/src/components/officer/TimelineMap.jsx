import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const TimelineMap = ({
  latitude,
  longitude,
}) => {
  if (!latitude || !longitude) {
    return (
      <div className="alert">
        Location not available.
      </div>
    );
  }

  const position = [
    Number(latitude),
    Number(longitude),
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-base-300 shadow-lg">

      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={false}
        style={{
          height: "320px",
          width: "100%",
        }}
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>

          <Popup>

            Officer Location

          </Popup>

        </Marker>

      </MapContainer>

    </div>
  );
};

export default TimelineMap;