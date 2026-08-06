const locationService = {
  async reverseGeocode(latitude, longitude) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location.");
    }

    return response.json();
  },
};

export default locationService;