import { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import {
  FaCrosshairs,
  FaMapMarkerAlt,
} from "react-icons/fa";

import locationService from "../../services/location.service";

const ChangeLocation = ({
  position,
  setPosition,
  setValue,
  loadAddress,
}) => {
  const updatePosition = async (lat, lng) => {
    setPosition({ lat, lng });
    setValue("latitude", lat);
    setValue("longitude", lng);
    await loadAddress(lat, lng);
  };

  useMapEvents({
    async click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      await updatePosition(lat, lng);
    },
  });

  return position ? (
    <Marker
      draggable
      eventHandlers={{
        async dragend(e) {
          const marker = e.target;
          const nextPosition = marker.getLatLng();

          await updatePosition(
            nextPosition.lat,
            nextPosition.lng
          );
        },
      }}
      position={[position.lat, position.lng]}
    />
  ) : null;
};

const LocationPicker = ({ setValue }) => {
  const [position, setPosition] = useState(null);
  const [selectedAddress, setSelectedAddress] =
    useState("");

  const loadAddress = useCallback(
    async (lat, lng) => {
      try {
        const data =
          await locationService.reverseGeocode(
            lat,
            lng
          );

        const address = data.address || {};
        const village =
          address.village ||
          address.town ||
          address.city ||
          "";

        setValue("village", village);
        setValue("address", data.display_name || "");
        setSelectedAddress(
          village || data.display_name || ""
        );
      } catch (error) {
        console.log(error);
      }
    },
    [setValue]
  );

  const resetToCurrentLocation = useCallback(() => {
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
  }, [loadAddress, setValue]);

  useEffect(() => {
    resetToCurrentLocation();
  }, [resetToCurrentLocation]);

  useEffect(() => {
    if (!position) return;

    setValue("latitude", position.lat);
    setValue("longitude", position.lng);
  }, [position, setValue]);

  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_240px] sm:items-stretch">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-2">
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
          className="h-28 w-full rounded-lg sm:h-32"
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

      <div className="rounded-lg bg-indigo-50 p-3">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
            <FaMapMarkerAlt />
          </div>

          <div>
            <p className="text-sm font-black text-slate-950">
              {selectedAddress ||
                "Select issue location"}
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-500">
              Click on the map to pin the issue location.
            </p>
            <button
              type="button"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white"
              onClick={resetToCurrentLocation}
            >
              <FaCrosshairs />
              Reset Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
