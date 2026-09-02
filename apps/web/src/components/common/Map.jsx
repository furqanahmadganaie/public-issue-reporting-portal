import {
  MapContainer,
  TileLayer,
  Marker,
} from "react-leaflet";

const Map = ({
  latitude,
  longitude,
  className = "h-96",
}) => {
  return (
    <div className="relative z-0 w-full">
      <MapContainer
        center={[
          Number(latitude),
          Number(longitude),
        ]}
        zoom={15}
        scrollWheelZoom={true}
        className={`${className} w-full rounded-lg`}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[
            Number(latitude),
            Number(longitude),
          ]}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
