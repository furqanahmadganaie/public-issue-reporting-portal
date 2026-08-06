import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import locationService from "../../services/location.service";

const ChangeLocation = ({ position, setPosition ,setValue,loadAddress}) => {
  useMapEvents({
     async click(e) {
        const lat = e.latlng.lat;
       const lng = e.latlng.lng;

      setPosition({
        lat,
        lng,
      });
  setValue("latitude", lat);
  setValue("longitude", lng);
  await loadAddress(lat, lng);

    },
  });

  return position ? (
    <Marker position={[position.lat, position.lng]} />
  ) : null;
};

const LocationPicker = ({setValue,}) => {

  


  const [position, setPosition] = useState(null);

  const loadAddress = async (lat, lng) => {
  try {
    const data =
      await locationService.reverseGeocode(
        lat,
        lng
      );

    const address = data.address || {};

    setValue(
      "village",
      address.village ||
        address.town ||
        address.city ||
        ""
    );

    setValue(
      "address",
      data.display_name || ""
    );
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition({ lat, lng });

        setValue("latitude", lat);
        setValue("longitude", lng);
        loadAddress(lat, lng);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    if (!position) return;

    setValue("latitude", position.lat);
    setValue("longitude", position.lng);
  }, [position]);

  return (
    <div className="space-y-4">

      <MapContainer
        center={
          position
            ? [
                position.lat,
                position.lng,
              ]
            : [20.5937, 78.9629]
        }
        zoom={15}
        className="h-96 rounded-xl"
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeLocation
  position={position}
  setPosition={setPosition}
  setValue={setValue}
  loadAddress={loadAddress}
/>

      </MapContainer>

    </div>
  );
};

export default LocationPicker;